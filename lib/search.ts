import { milesKnowledge } from '@/data/knowledge-base'

/**
 * Off-topic query detection patterns
 * 
 * EXPANSION GUIDE:
 * - Add new off-topic patterns to offTopicPatterns array
 * - Add new portfolio-related terms to portfolioTerms array
 * - Use case-insensitive regex patterns for flexibility
 * - Test new patterns with various query formats
 */
const offTopicPatterns = [
  /what is the capital of/i,
  /who is the president/i,
  /recipe for/i,
  /weather in/i,
  /how to cook/i,
  /how to bake/i,
  /how to fix/i,
  /how to repair/i,
  /how to install/i,
  /how to build a house/i,
  /how to make money/i,
  /stock price/i,
  /crypto price/i,
  /bitcoin price/i,
  /sports score/i,
  /movie review/i,
  /restaurant recommendation/i,
  /travel advice/i,
  /dating advice/i,
  /medical advice/i,
  /legal advice/i
];

const portfolioTerms = [
  /project/i,
  /work/i,
  /experience/i,
  /expertise/i,
  /touchdesigner/i,
  /max/i,
  /midi/i,
  /music/i,
  /installation/i,
  /you built/i,
  /you created/i,
  /your background/i,
  /your work/i,
  /your experience/i,
  /your projects/i,
  /portfolio/i,
  /career/i,
  /professional/i,
  /skills/i,
  /technologies/i,
  /development/i,
  /programming/i,
  /coding/i,
  /design/i,
  /system/i,
  /architecture/i,
  /ai/i,
  /artificial intelligence/i,
  /machine learning/i,
  /rag/i,
  /retrieval/i,
  /generation/i,
  /complex systems/i,
  /emergence/i,
  /antifragile/i,
  /energy trading/i,
  /risk management/i,
  /e-commerce/i,
  /magento/i,
  /next\.js/i,
  /react/i,
  /typescript/i,
  /three\.js/i,
  /vercel/i,
  /groq/i,
  /llama/i
];

/**
 * Detects if a query is portfolio-related or off-topic
 * 
 * @param query - The user's query string
 * @returns boolean - true if portfolio-related, false if off-topic
 */
export function isPortfolioRelated(query: string): boolean {
  const queryLower = query.toLowerCase().trim();
  
  // Check for obvious off-topic patterns first
  for (const pattern of offTopicPatterns) {
    if (pattern.test(queryLower)) {
      return false;
    }
  }
  
  // Check for portfolio-related terms
  for (const term of portfolioTerms) {
    if (term.test(queryLower)) {
      return true;
    }
  }
  
  // Default to true for ambiguous queries (let RAG handle them)
  // This prevents false negatives that might block legitimate portfolio questions
  return true;
}

interface SearchResult {
  bio: string
  techStack: typeof milesKnowledge.techStack
  projects: typeof milesKnowledge.projects
  expertise: typeof milesKnowledge.expertise
  philosophy: typeof milesKnowledge.philosophy
  musicInspirations: typeof milesKnowledge.musicInspirations
  complexSystemsTheorists: typeof milesKnowledge.complexSystemsTheorists
  emergenceConcepts: typeof milesKnowledge.emergenceConcepts
  relevanceScore: number
  fallbackStrategy: 'none' | 'broader_search' | 'return_all'
}

// TypeScript types for context limiting
interface ContextLimiterOptions {
  maxEntities?: number
}

interface ContextLimiterResult {
  context: SearchResult
  wasTruncated: boolean
  originalCount: number
  finalCount: number
}

// TypeScript types for context quality validation
interface ContextQualityValidation {
  valid: boolean
  issue?: 'no_matches' | 'too_many_matches'
  action?: 'use_fallback' | 'limit_context'
}

export function searchKnowledge(query: string): SearchResult {
  const queryLower = query.toLowerCase()
  
  // Helper function to perform search with configurable minimum keyword length
  const performSearch = (minKeywordLength: number) => {
    const keywords = queryLower.split(/\s+/).filter(word => word.length > minKeywordLength)
    
    // Search projects
    const relevantProjects = milesKnowledge.projects.filter(project => {
      const searchText = `${project.title} ${project.description} ${project.technologies.join(' ')} ${project.keywords.join(' ')}`.toLowerCase()
      return keywords.some(keyword => searchText.includes(keyword))
    })
    
    // Search expertise
    const relevantExpertise = milesKnowledge.expertise.filter(exp => {
      const searchText = `${exp.area} ${exp.description} ${exp.examples.join(' ')} ${exp.keywords.join(' ')}`.toLowerCase()
      return keywords.some(keyword => searchText.includes(keyword))
    })
    
    // Search music inspirations
    const relevantMusicInspirations = milesKnowledge.musicInspirations.filter(inspiration => {
      const searchText = `${inspiration.name} ${inspiration.description} ${inspiration.genres.join(' ')} ${inspiration.instruments.join(' ')} ${inspiration.keyWorks.join(' ')} ${inspiration.influence} ${inspiration.keywords.join(' ')}`.toLowerCase()
      return keywords.some(keyword => searchText.includes(keyword))
    })
    
    // Search complex systems theorists
    const relevantComplexSystemsTheorists = milesKnowledge.complexSystemsTheorists.filter(theorist => {
      const searchText = `${theorist.name} ${theorist.description} ${theorist.keyContributions.join(' ')} ${theorist.institutions.join(' ')} ${theorist.publications.join(' ')} ${theorist.relevance} ${theorist.keywords.join(' ')}`.toLowerCase()
      return keywords.some(keyword => searchText.includes(keyword))
    })
    
    // Search emergence concepts
    const relevantEmergenceConcepts = milesKnowledge.emergenceConcepts.filter(concept => {
      const searchText = `${concept.name} ${concept.description} ${concept.types.join(' ')} ${concept.examples.join(' ')} ${concept.characteristics.join(' ')} ${concept.relevance} ${concept.keywords.join(' ')}`.toLowerCase()
      return keywords.some(keyword => searchText.includes(keyword))
    })
    
    return {
      projects: relevantProjects,
      expertise: relevantExpertise,
      musicInspirations: relevantMusicInspirations,
      complexSystemsTheorists: relevantComplexSystemsTheorists,
      emergenceConcepts: relevantEmergenceConcepts
    }
  }
  
  // Initial search with standard minimum keyword length (3)
  let searchResults = performSearch(2) // Start with 2 to match original behavior
  let fallbackStrategy: 'none' | 'broader_search' | 'return_all' = 'none'
  
  // FALLBACK LOGIC: Detect when main content areas are all empty
  // This ensures the chatbot always has relevant content to work with
  const hasNoMainContent = searchResults.projects.length === 0 && 
                          searchResults.expertise.length === 0 && 
                          searchResults.musicInspirations.length === 0
  
  if (hasNoMainContent) {
    // ANALYTICS: Track empty results detection
    // Fires: When no entities match the initial search
    // Note: This will be tracked in the chat route after searchKnowledge returns
    // Strategy 1: Try broader search with lower minimum keyword length
    // This catches cases where important keywords are too short (e.g., "AI", "JS")
    searchResults = performSearch(1) // Lower to 1 character minimum
    fallbackStrategy = 'broader_search'
    
    // Strategy 2: If still empty, return ALL entities (with music limit)
    // This ensures the chatbot always has comprehensive context to draw from
    const stillHasNoMainContent = searchResults.projects.length === 0 && 
                                 searchResults.expertise.length === 0 && 
                                 searchResults.musicInspirations.length === 0
    
    if (stillHasNoMainContent) {
      searchResults = {
        projects: milesKnowledge.projects,
        expertise: milesKnowledge.expertise,
        musicInspirations: milesKnowledge.musicInspirations.slice(0, 5), // Limit music to 5 items max
        complexSystemsTheorists: milesKnowledge.complexSystemsTheorists,
        emergenceConcepts: milesKnowledge.emergenceConcepts
      }
      fallbackStrategy = 'return_all'
    }
  }
  
  // Calculate relevance score
  const relevanceScore = searchResults.projects.length + 
                        searchResults.expertise.length + 
                        searchResults.musicInspirations.length + 
                        searchResults.complexSystemsTheorists.length + 
                        searchResults.emergenceConcepts.length
  
  return {
    bio: milesKnowledge.bio,
    techStack: milesKnowledge.techStack,
    projects: searchResults.projects,
    expertise: searchResults.expertise,
    philosophy: milesKnowledge.philosophy,
    musicInspirations: searchResults.musicInspirations,
    complexSystemsTheorists: searchResults.complexSystemsTheorists,
    emergenceConcepts: searchResults.emergenceConcepts,
    relevanceScore,
    fallbackStrategy // Add fallback strategy to result for tracking
  }
}

/**
 * Limits the context size to prevent token limit exceeded errors
 * Uses priority-based truncation: projects > expertise > musicInspirations > complexSystemsTheorists > emergenceConcepts
 * 
 * @param context - The search result context to limit
 * @param options - Configuration options including maxEntities (default: 15)
 * @returns ContextLimiterResult with truncated context and metadata
 */
export function limitContextSize(
  context: SearchResult, 
  options: ContextLimiterOptions = {}
): ContextLimiterResult {
  const maxEntities = options.maxEntities ?? 15
  
  // Count total entities across all arrays
  const originalCount = context.projects.length + 
                       context.expertise.length + 
                       context.musicInspirations.length + 
                       context.complexSystemsTheorists.length + 
                       context.emergenceConcepts.length
  
  // If under limit, return context unchanged
  if (originalCount <= maxEntities) {
    return {
      context,
      wasTruncated: false,
      originalCount,
      finalCount: originalCount
    }
  }
  
  // Create truncated context with priority-based truncation
  const truncatedContext: SearchResult = { ...context }
  let remainingSlots = maxEntities
  
  // Priority 1: Keep all projects (highest priority)
  const projectsToKeep = Math.min(context.projects.length, remainingSlots)
  truncatedContext.projects = context.projects.slice(0, projectsToKeep)
  remainingSlots -= projectsToKeep
  
  // Priority 2: Keep expertise items
  if (remainingSlots > 0) {
    const expertiseToKeep = Math.min(context.expertise.length, remainingSlots)
    truncatedContext.expertise = context.expertise.slice(0, expertiseToKeep)
    remainingSlots -= expertiseToKeep
  } else {
    truncatedContext.expertise = []
  }
  
  // Priority 3: Keep music inspirations
  if (remainingSlots > 0) {
    const musicToKeep = Math.min(context.musicInspirations.length, remainingSlots)
    truncatedContext.musicInspirations = context.musicInspirations.slice(0, musicToKeep)
    remainingSlots -= musicToKeep
  } else {
    truncatedContext.musicInspirations = []
  }
  
  // Priority 4: Keep complex systems theorists
  if (remainingSlots > 0) {
    const theoristsToKeep = Math.min(context.complexSystemsTheorists.length, remainingSlots)
    truncatedContext.complexSystemsTheorists = context.complexSystemsTheorists.slice(0, theoristsToKeep)
    remainingSlots -= theoristsToKeep
  } else {
    truncatedContext.complexSystemsTheorists = []
  }
  
  // Priority 5: Keep emergence concepts
  if (remainingSlots > 0) {
    const conceptsToKeep = Math.min(context.emergenceConcepts.length, remainingSlots)
    truncatedContext.emergenceConcepts = context.emergenceConcepts.slice(0, conceptsToKeep)
  } else {
    truncatedContext.emergenceConcepts = []
  }
  
  // Recalculate relevance score for truncated context
  const finalCount = truncatedContext.projects.length + 
                    truncatedContext.expertise.length + 
                    truncatedContext.musicInspirations.length + 
                    truncatedContext.complexSystemsTheorists.length + 
                    truncatedContext.emergenceConcepts.length
  
  truncatedContext.relevanceScore = finalCount
  
  return {
    context: truncatedContext,
    wasTruncated: true,
    originalCount,
    finalCount
  }
}

/**
 * Validates the quality of RAG retrieval results
 * 
 * @param context - The search result context to validate
 * @returns ContextQualityValidation with validation results and suggested actions
 */
export function validateContextQuality(context: SearchResult): ContextQualityValidation {
  // Count total entities across all arrays
  const totalEntities = context.projects.length + 
                       context.expertise.length + 
                       context.musicInspirations.length + 
                       context.complexSystemsTheorists.length + 
                       context.emergenceConcepts.length
  
  // Check for zero entities (no matches found)
  if (totalEntities === 0) {
    return {
      valid: false,
      issue: 'no_matches',
      action: 'use_fallback'
    }
  }
  
  // Check for too many entities (potential information overload)
  if (totalEntities > 15) {
    return {
      valid: false,
      issue: 'too_many_matches',
      action: 'limit_context'
    }
  }
  
  // Context quality is acceptable
  return {
    valid: true
  }
}
