'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getProjectsByCategory } from './data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { CubeScene } from '@/components/CubeScene';

// Dynamically import heavy 3D component for better performance
const RotatingCylinderLinesR3F = dynamic(
  () => import('@/components/RotatingCylinderLinesR3F'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-black rounded-lg animate-pulse" />
    )
  }
);

export default function HomePage() {
  // Ensure page starts at top when navigating to homepage
  useEffect(() => {
    // Use requestAnimationFrame to ensure this runs after any layout shifts
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-12">
        <div className="max-w-7xl mx-auto text-center flex flex-col justify-center -mt-8 sm:-mt-8 lg:-mt-16">
          {/* 1. Hero Animation - Fades in first */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6 sm:mb-8"
          >
            {/* 3D Rotating Cylinder - Large and prominent against black background */}
            <div className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] mx-auto">
              <RotatingCylinderLinesR3F />
            </div>
          </motion.div>

        <div className="space-y-2 sm:space-y-3">
          {/* 2. Subtitle - Fades in after three words (after 2.7s delay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.7 }}
            className="text-[10px] sm:text-xs font-light text-neutral-600 dark:text-neutral-400 uppercase tracking-[0.1em] mb-2"
          >
            CREATIVE TECHNOLOGY & COMPLEX SYSTEMS
          </motion.div>

          {/* 3. Three Words - Animate in first (after 0.9s delay) */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-neutral-900 dark:text-neutral-100 leading-tight">
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="inline-block"
            >
              Robust.
            </motion.span>
            {' '}
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
              className="inline-block"
            >
              Antifragile.
            </motion.span>
            {' '}
            <motion.span
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.9, ease: "easeOut" }}
              className="inline-block"
            >
              Emergent.
            </motion.span>
          </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.3, ease: "easeOut" }}
              className="text-[11px] sm:text-xs lg:text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-[400px] sm:max-w-[450px] mx-auto leading-relaxed"
            >
              Certified by the Santa Fe Institute of Complex Science, with 
              expertise in complex, adaptive systems. 20+ years experience in 
              designing, implementing & testing large-scale real-time complex 
              systems, & automating company-wide processes.
            </motion.p>

            {/* "Ask Miles" button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 4.0, ease: "easeOut" }}
              className="mt-4"
            >
              <Link 
                href="#chat"
                className="inline-block px-6 py-2 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
              >
                Ask Miles
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Background Elements */}
      </section>

      {/* Simple Projects Preview */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-[10%] sm:px-[8%] lg:px-[5%]">

          {/* Desktop Layout - Keep original */}
          <div className="hidden md:block space-y-20">
            {['Projects', 'Music', 'Code'].map((section, sectionIndex) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 dark:text-neutral-100 mb-4">
                    {section}
                  </h3>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
                </div>

                <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {(() => {
                    const projects = getProjectsByCategory(section as 'Projects' | 'Music' | 'Code');
                    if (!projects || projects.length === 0) {
                        return (
                        <p className="text-center text-neutral-500 dark:text-neutral-400 col-span-full">
                          No items for {section}
                        </p>
                      );
                    }
                    return projects.slice(0, 4).map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <ProjectCard 
                          title={item.title}
                          description={item.description}
                          image={item.image}
                          video={item.video}
                          link={`/projects/${item.slug}`}
                        />
                      </motion.div>
                    ));
                  })()}
                </div>

                {sectionIndex < 2 && (
                  <div className="text-center pt-8">
                    <Link
                      href={`/${section.toLowerCase()}`}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                    >
                      View All {section}
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout - Single column with section headings */}
          <div className="md:hidden space-y-12">
            {['Projects', 'Music', 'Code'].map((section, sectionIndex) => {
              const projects = getProjectsByCategory(section as 'Projects' | 'Music' | 'Code');
              if (!projects || projects.length === 0) return null;
              
              return (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {/* Section Heading */}
                  <div className="text-center">
                    <h3 className="text-2xl font-light text-neutral-900 dark:text-neutral-100 mb-2">
                      {section}
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
                  </div>

                  {/* All projects in single column */}
                  <div className="space-y-8">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <Link 
                          href={`/projects/${project.slug}`} 
                          className="block"
                          prefetch={true}
                        >
                          <div className="overflow-hidden">
                            {/* Image Container - Match individual project page styling */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="100vw"
                              />
                            </div>

                            {/* Title underneath - Match individual project page styling */}
                            <div className="pt-4">
                              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                {project.title}
                              </h3>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                                {project.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* View All Link */}
                  <div className="text-center pt-4">
                    <Link
                      href={`/${section.toLowerCase()}`}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
                    >
                      View All {section}
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Mobile-Only Ask Miles Button - Below projects, above footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:hidden text-center pt-16 pb-8"
          >
            <button 
              onClick={() => window.location.href = '/about#chatbot'}
              className="inline-block text-lg font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
            >
              Ask Miles
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
