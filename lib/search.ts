import { milesKnowledge } from '@/data/knowledge-base'

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
}

export function searchKnowledge(query: string): SearchResult {
  const queryLower = query.toLowerCase()
  const keywords = queryLower.split(/\s+/).filter(word => word.length > 2)
  
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
  
  // Calculate relevance score
  const relevanceScore = relevantProjects.length + relevantExpertise.length + relevantMusicInspirations.length + relevantComplexSystemsTheorists.length + relevantEmergenceConcepts.length
  
  return {
    bio: milesKnowledge.bio,
    techStack: milesKnowledge.techStack,
    projects: relevantProjects,
    expertise: relevantExpertise,
    philosophy: milesKnowledge.philosophy,
    musicInspirations: relevantMusicInspirations,
    complexSystemsTheorists: relevantComplexSystemsTheorists,
    emergenceConcepts: relevantEmergenceConcepts,
    relevanceScore
  }
}
