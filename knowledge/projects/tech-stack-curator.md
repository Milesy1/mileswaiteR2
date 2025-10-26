---
title: "Automated Tech Stack Curator"
category: "projects"
keywords: ["automation", "content curation", "groq", "cron jobs", "vercel", "ai", "nextjs"]
technologies: ["next.js", "groq", "vercel", "typescript", "cron", "ai"]
---

# Automated Tech Stack Curator

## Project Overview

A fully automated system that curates tech content weekly and updates my Now page with the latest, highest-quality articles from multiple sources. The system runs every Monday at 9am UTC with zero maintenance required.

## Technical Implementation

### Architecture
- **Content Sources**: Hacker News, Dev.to, Reddit, GitHub
- **AI Curation**: Groq API for intelligent content filtering
- **Automation**: Vercel cron jobs for weekly execution
- **Integration**: Seamless Now page integration with existing design

### Key Components

#### 1. Tech Stack Definition (`lib/techStack.ts`)
```typescript
export const TECH_STACK = {
  web: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  ai: ['RAG', 'LLMs', 'Groq'],
  creative: ['TouchDesigner', 'Generative Systems']
}
```

#### 2. Content Sources (`lib/contentSources.ts`)
- **Hacker News API**: Algolia search for recent stories
- **Dev.to API**: Top articles by tag and timeframe
- **Reddit API**: Programming and webdev subreddits
- **GitHub API**: Recently created repositories (optional)

#### 3. AI Curation (`lib/curator.ts`)
- **Groq Integration**: Uses llama-3.1-8b-instant model
- **Quality Filtering**: Scores articles on relevance, quality, and novelty
- **Threshold**: Only articles scoring 7+ on all metrics are selected
- **Limit**: Maximum 5 articles per week

#### 4. Automation (`app/api/curator/cron/route.ts`)
- **Schedule**: Every Monday at 9am UTC via Vercel cron
- **Security**: Protected with CRON_SECRET environment variable
- **Error Handling**: Graceful fallbacks and comprehensive logging
- **Data Persistence**: Updates `public/data/now.json` with curated content

## Content Curation Process

### 1. Content Fetching
- Searches for content from past 7 days
- Uses tech-specific keywords for each technology
- Combines results from all sources
- Typically finds 20-30 items per tech topic

### 2. AI Evaluation
- Groq evaluates each article on three criteria:
  - **Relevance** (0-10): How relevant to advanced development?
  - **Quality** (0-10): Well-written, accurate, valuable?
  - **Novelty** (0-10): New information, not beginner content?

### 3. Final Selection
- Only articles scoring 7+ on all three metrics
- Maximum 5 articles total per week
- Prioritizes diversity across tech topics
- Filters out beginner tutorials and promotional content

## Deployment & Configuration

### Environment Variables
```bash
GROQ_API_KEY=gsk_xxx  # Groq API key for AI curation
CRON_SECRET=xxx       # Random secret for cron security
GITHUB_TOKEN=xxx      # Optional, for GitHub repository access
```

### Vercel Configuration (`vercel.json`)
```json
{
  "crons": [{
    "path": "/api/curator/cron",
    "schedule": "0 9 * * 1"
  }]
}
```

## Results & Impact

### Weekly Output
- **5 curated articles** per week
- **High-quality content** filtered by AI
- **Tech-focused** on my specific stack
- **Automatic updates** to Now page

### User Experience
- **Seamless integration** with existing Now page design
- **Consistent styling** with other sections
- **External links** open in new tabs
- **Relative timestamps** show when content was updated

## Technical Challenges Solved

### 1. API Rate Limiting
- Implemented graceful error handling for all APIs
- Used Promise.allSettled for parallel requests
- Fallback mechanisms when sources fail

### 2. Content Quality
- AI-powered filtering eliminates low-quality content
- Multi-metric scoring ensures relevance and novelty
- Keyword-based targeting for tech-specific content

### 3. Automation Reliability
- Comprehensive error handling and logging
- Environment variable validation
- Graceful degradation when APIs fail

### 4. Integration
- Non-breaking changes to existing Now page
- Backward compatibility with existing data structure
- Consistent styling with existing sections

## Future Enhancements

### Potential Improvements
- **Sentiment Analysis**: Filter for positive, constructive content
- **Personalization**: Learn from user engagement patterns
- **Source Diversity**: Add more content sources (Medium, Substack)
- **Topic Expansion**: Include more tech areas as interests evolve
- **Analytics**: Track which articles get the most engagement

### Scalability Considerations
- **Caching**: Implement Redis for API response caching
- **Queue System**: Use background job processing for large-scale operations
- **Monitoring**: Add comprehensive monitoring and alerting
- **A/B Testing**: Test different curation strategies

## Lessons Learned

### What Worked Well
- **AI Curation**: Groq's filtering significantly improved content quality
- **Multi-Source Approach**: Diversified content sources reduced bias
- **Automation**: Zero-maintenance operation exceeded expectations
- **Integration**: Seamless Now page integration maintained design consistency

### Key Insights
- **Quality over Quantity**: 5 high-quality articles > 20 mediocre ones
- **AI Filtering**: Human-like judgment at scale is invaluable
- **Error Handling**: Robust error handling is crucial for automation
- **User Experience**: Invisible automation that just works

## Code Architecture

### File Structure
```
lib/
├── techStack.ts          # Tech definitions and keywords
├── contentSources.ts     # API integrations
└── curator.ts           # Groq AI curation logic

app/api/curator/
├── cron/route.ts        # Automated weekly runs
├── manual/route.ts      # Manual testing
└── debug/route.ts       # Development debugging

public/data/
└── now.json            # Updated with learning section
```

### Key Design Patterns
- **Separation of Concerns**: Each file has a single responsibility
- **Error Boundaries**: Comprehensive error handling at each layer
- **Environment Configuration**: All secrets properly externalized
- **Type Safety**: Full TypeScript coverage for reliability

This system represents a successful integration of AI, automation, and web development best practices to create a truly hands-off content curation solution.
