import Groq from 'groq-sdk'

// Initialize Groq client lazily to ensure environment variables are loaded
function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY environment variable is not set')
  }
  return new Groq({
    apiKey: process.env.GROQ_API_KEY
  })
}

interface CuratedItem {
  title: string
  url: string
  topic: string
  summary?: string
}

export async function curateWithGroq(
  techName: string,
  rawContent: any[]
): Promise<CuratedItem[]> {
  
  // If no content, return empty
  if (rawContent.length === 0) {
    console.log(`No raw content provided for ${techName}`)
    return []
  }
  
  // Check if Groq API key is available
  if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not set, using fallback: returning top 3 raw items')
    return rawContent.slice(0, 3).map(item => ({
      title: item.title,
      url: item.url,
      topic: techName
    }))
  }
  
  // Limit to 20 items for context window
  const contentToEvaluate = rawContent.slice(0, 20)
  
  const prompt = `You are a technical content curator evaluating articles about ${techName}.

Raw content to evaluate:
${JSON.stringify(contentToEvaluate, null, 2)}

Evaluate each item on:
1. Relevance (0-10): How relevant to advanced ${techName} development?
2. Quality (0-10): Well-written, accurate, valuable?
3. Novelty (0-10): New information, not beginner content?

Score each item on all three metrics (0-10).

If any items score 7+ on all three metrics, return those (max 5).
Otherwise, return the top 3-5 items that have the highest average score across all three metrics.
Always return at least 3 items if content is available.
Maximum 5 items total.

Output format (valid JSON array only):
[
  {
    "title": "Article title",
    "url": "https://...",
    "topic": "${techName}"
  }
]

Filter out:
- Beginner tutorials
- Promotional content
- Duplicate information
- Low-quality content

Return valid JSON array only. No markdown, no additional text.`

  try {
    const groq = getGroqClient()
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a technical content curator. Output only valid JSON arrays.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.1-8b-instant', // Using working model
      temperature: 0.3,
      max_tokens: 2000
    })

    const responseText = completion.choices[0]?.message?.content || '[]'
    
    // Strip markdown code blocks if present
    const jsonText = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()
    
    let curated = []
    try {
      curated = JSON.parse(jsonText)
    } catch (parseError) {
      console.error('Failed to parse Groq response as JSON:', jsonText)
      // Fallback: return first 3 items from raw content if Groq fails
      return rawContent.slice(0, 3).map(item => ({
        title: item.title,
        url: item.url,
        topic: techName
      }))
    }
    
    // Validate structure
    if (!Array.isArray(curated)) {
      console.error('Curation did not return array, got:', typeof curated)
      // Fallback: return first 3 items from raw content
      return rawContent.slice(0, 3).map(item => ({
        title: item.title,
        url: item.url,
        topic: techName
      }))
    }
    
    // If Groq returned empty array, use fallback
    if (curated.length === 0 && rawContent.length > 0) {
      console.log('Groq returned empty array, using fallback: top 3 raw items')
      return rawContent.slice(0, 3).map(item => ({
        title: item.title,
        url: item.url,
        topic: techName
      }))
    }
    
    return curated.slice(0, 5) // Ensure max 5 items
    
  } catch (error) {
    console.error('Groq curation failed:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    // Fallback: return top 3 raw items if Groq fails
    console.log('Using fallback: returning top 3 raw items due to Groq error')
    if (rawContent.length > 0) {
      return rawContent.slice(0, 3).map(item => ({
        title: item.title,
        url: item.url,
        topic: techName
      }))
    }
    return []
  }
}
