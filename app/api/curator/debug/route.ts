import { NextRequest } from 'next/server'
import { TECH_STACK } from '@/lib/techStack'
import { fetchAllSources } from '@/lib/contentSources'

export const runtime = 'nodejs'

interface DebugResults {
  techName: string;
  keywords: string[];
  rawContentCount: number;
  sampleContent: unknown[];
  groqApiKey: string;
}

export async function GET() {
  try {
    const results: DebugResults = {
      techName: '',
      keywords: [],
      rawContentCount: 0,
      sampleContent: [],
      groqApiKey: 'Not set'
    }
    
    // Test just one tech to see what's happening
    const testTech = TECH_STACK.web[0] // Next.js
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Testing content fetch for ${testTech.name}...`)
    }
    
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
