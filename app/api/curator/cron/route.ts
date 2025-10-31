import { NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { TECH_STACK } from '@/lib/techStack'
import { fetchAllSources } from '@/lib/contentSources'
import { curateWithGroq } from '@/lib/curator'

export const runtime = 'nodejs'

interface CuratedItem {
  title: string
  url: string
  topic: string
  summary?: string
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  console.log('Starting weekly curation...')
  
  try {
    const allCurated: CuratedItem[] = []
    
    // Process each tech category
    for (const category of Object.values(TECH_STACK)) {
      for (const tech of category) {
        console.log(`Fetching content for ${tech.name}...`)
        
        // Fetch content from all sources
        const rawContent = await fetchAllSources(tech)
        
        console.log(`Found ${rawContent.length} items for ${tech.name}`)
        
        if (rawContent.length === 0) continue
        
        // Curate with Groq
        const curated = await curateWithGroq(tech.name, rawContent)
        
        console.log(`Curated ${curated.length} items for ${tech.name}`)
        
        allCurated.push(...curated)
      }
    }
    
    // Sort by topic diversity and take top 5
    const topLearning = allCurated.slice(0, 5)
    
    console.log(`Total curated items: ${topLearning.length}`)
    
    // Read now.json
    const nowPath = path.join(process.cwd(), 'public/data/now.json')
    const nowData = JSON.parse(await fs.readFile(nowPath, 'utf-8'))
    
    // Update learning section (only if we have items)
    if (topLearning.length > 0) {
      nowData.currentEntry.learning = topLearning
      nowData.currentEntry.learningUpdatedAt = new Date().toISOString()
      
      // Write back
      await fs.writeFile(nowPath, JSON.stringify(nowData, null, 2))
      
      console.log('Successfully updated now.json')
    } else {
      console.log('No quality content found, keeping existing learning section')
    }
    
    return Response.json({ 
      success: true, 
      itemsAdded: topLearning.length,
      items: topLearning
    })
    
  } catch (error) {
    console.error('Curation failed:', error)
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
