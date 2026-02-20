'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, use, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShareButton } from '@/components/ShareButton';
import katex from 'katex';
import 'katex/dist/katex.min.css';

import { blogPosts } from '../../../data/blog-posts';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const resolvedParams = use(params);
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!post) {
    notFound();
  }

  // Process content to render math equations (post is defined here)
  const processedContent = (() => {
    let content = post.content;
    
    // Replace block math \[ \]
    content = content.replace(/\\\[([\s\S]*?)\\\]/g, (match, formula) => {
      try {
        return katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false });
      } catch (e) {
        console.error('KaTeX block math error:', e);
        return match;
      }
    });
    
    // Replace inline math \( \)
    content = content.replace(/\\\(([\s\S]*?)\\\)/g, (match, formula) => {
      try {
        return katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false });
      } catch (e) {
        console.error('KaTeX inline math error:', e);
        return match;
      }
    });
    
    return content;
  })();

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

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400"
            >
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Share Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center pt-4"
            >
              <ShareButton
                title={post.title}
                slug={post.slug}
                type="blog"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </div>
      </section>
    </motion.div>
  );
}