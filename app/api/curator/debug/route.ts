import { NextRequest } from 'next/server'
import { TECH_STACK } from '@/lib/techStack'
import { fetchAllSources } from '@/lib/contentSources'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const results: any = {}
    
    // Test just one tech to see what's happening
    const testTech = TECH_STACK.web[0] // Next.js
    
    console.log(`Testing content fetch for ${testTech.name}...`)
    
    const rawContent = await fetchAllSources(testTech)
    
    results.techName = testTech.name
    results.keywords = testTech.keywords
    results.rawContentCount = rawContent.length
    results.sampleContent = rawContent.slice(0, 3) // First 3 items
    results.groqApiKey = process.env.GROQ_API_KEY ? 'Set' : 'Not set'
    
    return Response.json(results)
    
  } catch (error) {
    return Response.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
