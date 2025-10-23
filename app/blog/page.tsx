'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ============================================================================
// BLOG DATA - Easy to update!
// ============================================================================
// To add a new blog post:
// 1. Add a new object to the blogPosts array
// 2. Update the slug, title, excerpt, date, readTime, and tags
// 3. The posts will automatically appear in reverse chronological order

const blogPosts = [
  {
    slug: "emergent-geometry-touchdesigner",
    title: "Emergent Geometry in TouchDesigner",
    excerpt: "Exploring how procedural systems can generate complex, organic forms that emerge from simple rules and interactions.",
    date: "October 15, 2025",
    readTime: "8 min read",
    tags: ["TouchDesigner", "Generative Art", "Geometry"]
  },
  {
    slug: "complex-systems-thinking",
    title: "Complex Systems and Creative Practice",
    excerpt: "How understanding complex adaptive systems can inform and enhance creative work across disciplines.",
    date: "October 8, 2025",
    readTime: "12 min read",
    tags: ["Complex Systems", "Philosophy", "Creative Practice"]
  },
  {
    slug: "python-automation-workflow",
    title: "Python Automation for Creative Workflows",
    excerpt: "Building efficient pipelines that connect different creative tools and automate repetitive tasks.",
    date: "October 1, 2025",
    readTime: "6 min read",
    tags: ["Python", "Automation", "Workflow"]
  },
  {
    slug: "sound-design-philosophy",
    title: "The Philosophy of Sound Design",
    excerpt: "Thoughts on how sound shapes perception and creates emotional landscapes in digital environments.",
    date: "September 24, 2025",
    readTime: "10 min read",
    tags: ["Sound Design", "Philosophy", "Perception"]
  },
  {
    slug: "nextjs-portfolio-architecture",
    title: "Building a Minimal Portfolio with Next.js",
    excerpt: "Architectural decisions and design patterns for creating clean, performant portfolio sites.",
    date: "September 17, 2025",
    readTime: "7 min read",
    tags: ["Next.js", "Web Development", "Portfolio"]
  }
];

export default function BlogPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div 
      className="pt-16 lg:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 dark:text-neutral-100">
              Emergence
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-[500px] mx-auto leading-[1.4]"
            >
              Thoughts on technology, creativity, & complex systems.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-12"
          >
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 transition-colors duration-200">
                    {/* Post Title */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {post.title}
                    </h2>
                    
                    {/* Post Excerpt */}
                    <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    
                    {/* Post Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="font-mono">{post.date}</span>
                      <span className="text-neutral-300 dark:text-neutral-600">·</span>
                      <span>{post.readTime}</span>
                      {post.tags.length > 0 && (
                        <>
                          <span className="text-neutral-300 dark:text-neutral-600">·</span>
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
