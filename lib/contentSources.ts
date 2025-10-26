import { TECH_STACK } from './techStack'

interface RawContent {
  title: string
  url: string
  source: string
  publishedAt: string
  score?: number
}

// Hacker News API
export async function fetchHackerNews(keywords: string[]): Promise<RawContent[]> {
  const oneWeekAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60)
  const query = keywords.join(' OR ')
  
  try {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&numericFilters=created_at_i>${oneWeekAgo}&hitsPerPage=10`
    )
    
    if (!response.ok) throw new Error('HN API failed')
    
    const data = await response.json()
    
    return data.hits.map((hit: any) => ({
      title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      source: 'Hacker News',
      publishedAt: new Date(hit.created_at).toISOString(),
      score: hit.points
    }))
  } catch (error) {
    console.error('HN fetch failed:', error)
    return []
  }
}

// GitHub API
export async function fetchGitHub(keywords: string[]): Promise<RawContent[]> {
  // Skip GitHub if no token provided
  if (!process.env.GITHUB_TOKEN) {
    console.log('GitHub token not provided, skipping GitHub API')
    return []
  }

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
  
  const query = keywords.join('+')
  
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+created:>${oneWeekAgo}&sort=stars&per_page=10`,
      {
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )
    
    if (!response.ok) {
      console.log(`GitHub API failed with status: ${response.status}`)
      return []
    }
    
    const data = await response.json()
    
    return data.items.map((item: any) => ({
      title: item.full_name,
      url: item.html_url,
      source: 'GitHub',
      publishedAt: item.created_at,
      score: item.stargazers_count
    }))
  } catch (error) {
    console.error('GitHub fetch failed:', error)
    return []
  }
}

// Dev.to API
export async function fetchDevTo(tag: string): Promise<RawContent[]> {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&top=7&per_page=10`
    )
    
    if (!response.ok) throw new Error('Dev.to API failed')
    
    const data = await response.json()
    
    return data.map((article: any) => ({
      title: article.title,
      url: article.url,
      source: 'Dev.to',
      publishedAt: article.published_at,
      score: article.positive_reactions_count
    }))
  } catch (error) {
    console.error('Dev.to fetch failed:', error)
    return []
  }
}

// Reddit JSON API
export async function fetchReddit(subreddit: string, keywords: string[]): Promise<RawContent[]> {
  const query = keywords.join(' ')
  
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&sort=top&t=week&limit=10`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; TechCurator/1.0)'
        }
      }
    )
    
    if (!response.ok) throw new Error('Reddit API failed')
    
    const data = await response.json()
    
    return data.data.children.map((child: any) => ({
      title: child.data.title,
      url: child.data.url.startsWith('http') 
        ? child.data.url 
        : `https://reddit.com${child.data.permalink}`,
      source: 'Reddit',
      publishedAt: new Date(child.data.created_utc * 1000).toISOString(),
      score: child.data.score
    }))
  } catch (error) {
    console.error('Reddit fetch failed:', error)
    return []
  }
}

// Fetch all sources for a tech
export async function fetchAllSources(tech: any): Promise<RawContent[]> {
  const results = await Promise.allSettled([
    fetchHackerNews(tech.keywords),
    fetchGitHub(tech.keywords),
    fetchDevTo(tech.keywords[0]), // Use primary keyword as tag
    fetchReddit('programming', tech.keywords),
    fetchReddit('webdev', tech.keywords)
  ])
  
  const allContent: RawContent[] = []
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      allContent.push(...result.value)
    }
  })
  
  return allContent
}
