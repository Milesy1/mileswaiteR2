import { MetadataRoute } from 'next'
import { projectsData } from './data/projects'
import { blogPosts } from '@/data/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mileswaite.net'
  
  // Get build time for more accurate lastModified dates
  const buildTime = new Date()
  
  // Static pages with appropriate priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: buildTime,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/code`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/now`,
      lastModified: buildTime,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/collectible`,
      lastModified: buildTime,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic project pages
  const projectPages: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: buildTime,
    changeFrequency: 'monthly' as const,
    priority: project.featured ? 0.8 : 0.6,
  }))

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => {
    // Parse date from post.date string (e.g., "October 30, 2025")
    const postDate = post.date ? new Date(post.date) : buildTime
    
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  return [...staticPages, ...projectPages, ...blogPages]
}
