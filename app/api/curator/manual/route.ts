import { NextRequest } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { TECH_STACK } from '@/lib/techStack'
import { fetchAllSources } from '@/lib/contentSources'
import { curateWithGroq } from '@/lib/curator'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  console.log('Manual curation triggered...')
  
  try {
    const allCurated: any[] = []
    
    for (const category of Object.values(TECH_STACK)) {
      for (const tech of category) {
        console.log(`Fetching content for ${tech.name}...`)
        
        const rawContent = await fetchAllSources(tech)
        console.log(`Found ${rawContent.length} items for ${tech.name}`)
        
        if (rawContent.length === 0) continue
        
        const curated = await curateWithGroq(tech.name, rawContent)
        console.log(`Curated ${curated.length} items for ${tech.name}`)
        
        allCurated.push(...curated)
      }
    }
    
    const topLearning = allCurated.slice(0, 5)
    console.log(`Total curated items: ${topLearning.length}`)
    
    const nowPath = path.join(process.cwd(), 'public/data/now.json')
    const nowData = JSON.parse(await fs.readFile(nowPath, 'utf-8'))
    
    if (topLearning.length > 0) {
      nowData.currentEntry.learning = topLearning
      nowData.currentEntry.learningUpdatedAt = new Date().toISOString()
      
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
    console.error('Manual curation failed:', error)
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
