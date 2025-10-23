'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ============================================================================
// BLOG POST DATA - Same as main blog page
// ============================================================================
const blogPosts = [
  {
    slug: "emergent-geometry-touchdesigner",
    title: "Emergent Geometry in TouchDesigner",
    excerpt: "Exploring how procedural systems can generate complex, organic forms that emerge from simple rules and interactions.",
    date: "October 15, 2025",
    readTime: "8 min read",
    tags: ["TouchDesigner", "Generative Art", "Geometry"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "complex-systems-thinking",
    title: "Complex Systems and Creative Practice",
    excerpt: "How understanding complex adaptive systems can inform and enhance creative work across disciplines.",
    date: "October 8, 2025",
    readTime: "12 min read",
    tags: ["Complex Systems", "Philosophy", "Creative Practice"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "python-automation-workflow",
    title: "Python Automation for Creative Workflows",
    excerpt: "Building efficient pipelines that connect different creative tools and automate repetitive tasks.",
    date: "October 1, 2025",
    readTime: "6 min read",
    tags: ["Python", "Automation", "Workflow"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "sound-design-philosophy",
    title: "The Philosophy of Sound Design",
    excerpt: "Thoughts on how sound shapes perception and creates emotional landscapes in digital environments.",
    date: "September 24, 2025",
    readTime: "10 min read",
    tags: ["Sound Design", "Philosophy", "Perception"],
    content: "Coming soon - this is where the full blog post content would go..."
  },
  {
    slug: "nextjs-portfolio-architecture",
    title: "Building a Minimal Portfolio with Next.js",
    excerpt: "Architectural decisions and design patterns for creating clean, performant portfolio sites.",
    date: "September 17, 2025",
    readTime: "7 min read",
    tags: ["Next.js", "Web Development", "Portfolio"],
    content: "Coming soon - this is where the full blog post content would go..."
  }
];

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState<any>(null);
  
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params);

  useEffect(() => {
    setIsLoaded(true);
    const foundPost = blogPosts.find(p => p.slug === resolvedParams.slug);
    setPost(foundPost);
  }, [resolvedParams.slug]);

  if (!post) {
    notFound();
  }

  return (
    <motion.div 
      className="pt-16 lg:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Back to Blog */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Link 
                href="/blog"
                className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200 font-mono"
              >
                ← Back to Blog
              </Link>
            </motion.div>

            {/* Post Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 dark:text-neutral-100 leading-tight">
              {post.title}
            </h1>
            
            {/* Post Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <span className="font-mono">{post.date}</span>
              <span className="text-neutral-300 dark:text-neutral-600">·</span>
              <span>{post.readTime}</span>
              {post.tags.length > 0 && (
                <>
                  <span className="text-neutral-300 dark:text-neutral-600">·</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, tagIndex: number) => (
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
          </motion.div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-neutral dark:prose-invert max-w-none"
          >
            <div className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
              {post.content}
            </div>
          </motion.article>
        </div>
      </section>
    </motion.div>
  );
}
