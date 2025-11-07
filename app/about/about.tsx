'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { SkeletonSketch } from '../../components/SkeletonSketch';

// Lazy load heavy components with loading states
const MySketch = dynamic(
  () => import('../../components/MySketch'),
  { 
    ssr: false,
    loading: () => <SkeletonSketch className="absolute inset-0 w-full h-full" />
  }
);

export default function AboutPage() {
  const [shouldLoadSketch, setShouldLoadSketch] = useState(false);

  // Ensure page starts at top when navigating to about page
  useEffect(() => {
    // Use requestAnimationFrame to ensure this runs after any layout shifts
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  // Defer MySketch loading slightly to prioritize initial content render
  useEffect(() => {
    // Use double requestAnimationFrame to ensure skeleton has rendered
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShouldLoadSketch(true);
      });
    });
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 dark:text-neutral-100 mb-6">
                  About
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-800 dark:text-neutral-200 mb-6">
                  Miles Waite{' '}
                  <span className="text-sm font-normal text-[#888] dark:text-neutral-400 ml-2">
                    <motion.span
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
                      className="inline-block"
                    >
                      Robust.
                    </motion.span>
                    {' '}
                    <motion.span
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                      className="inline-block"
                    >
                      Antifragile.
                    </motion.span>
                    {' '}
                    <motion.span
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                      className="inline-block"
                    >
                      Emergent.
                    </motion.span>
                  </span>
                </h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
              </div>

              <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>
                  Certified by the Santa Fe Institute of Complex Science, with expertise in complex, adaptive systems.
                </p>
                <p>
                  20+ years experience in designing, implementing & testing large-scale real-time complex systems, & automating company-wide processes.
                </p>
                <p>
                  Proven experience of combining TouchDesigner and Python to create immersive, interactive, and reliable experiences.
                </p>
                <p>
                  Specialise in systems-thinking applied to creative tech, ensuring projects are visually compelling and technically robust.
                </p>
                <p>
                  Experienced in hybrid roles bridging technical problem solving and experimental creative work.
                </p>
                <p className="text-xl font-medium text-neutral-800 dark:text-neutral-200 pt-4">
                  Emergent. Robust. Antifragile
                </p>
              </div>

              {/* Skills */}
              <div className="pt-8">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Technologies & Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 
                    'Framer Motion', 'Three.js', 'Node.js', 'Python',
                    'Music Production', '3D Graphics', 'Web Design'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-700 dark:text-neutral-300 hover:border-primary-200 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3D Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full"
            >
              <div 
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] xl:h-[700px] relative"
                style={{ 
                  minHeight: '400px',
                  minWidth: '100%',
                  position: 'relative',
                  willChange: 'auto' // Optimize for smooth scrolling
                }}
              >
                <ErrorBoundary fallback={
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <p className="text-neutral-500 dark:text-neutral-400">Visualization unavailable</p>
                  </div>
                }>
                  {shouldLoadSketch ? (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                      <MySketch className="w-full h-full" />
                    </div>
                  ) : (
                    <SkeletonSketch className="absolute inset-0 w-full h-full" />
                  )}
                </ErrorBoundary>
              </div>
            </motion.div>
          </div>
          
          {/* CV Download - Between cylinder and chatbot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center pt-16"
          >
            <div className="flex flex-col items-center gap-4">
              <a
                href="/cv/Miles-Waite-CV.pdf"
                download
                className="inline-block px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-base text-neutral-700 dark:text-neutral-300 hover:border-primary-200 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                Download CV / Resume
              </a>
              <Link
                href="/assistant"
                className="inline-flex items-center px-6 py-3 rounded-full text-base font-medium transition-colors duration-200 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200"
              >
                Ask Miles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}
