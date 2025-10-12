'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { getProjectsByCategory } from './data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import RotatingCylinderLinesR3F from '@/components/RotatingCylinderLinesR3F';

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
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* 1. Hero Animation - Fades in first */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            {/* 3D Rotating Cylinder Lines */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
              <RotatingCylinderLinesR3F />
            </div>
          </motion.div>

        <div className="space-y-6">
          {/* 2. Subtitle - Fades in after three words (after 2.7s delay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.7 }}
            className="text-base font-light text-[#666] uppercase tracking-[0.1em] mb-4"
          >
            CREATIVE TECHNOLOGY & COMPLEX SYSTEMS
          </motion.div>

          {/* 3. Three Words - Animate in first (after 0.9s delay) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-neutral-900 leading-tight">
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
              className="text-sm font-normal text-[#888] max-w-[500px] mx-auto leading-[1.4]"
            >
              Certified by the Santa Fe Institute of Complex Science, with 
              expertise in complex, adaptive systems. 20+ years experience in 
              designing, implementing & testing large-scale real-time complex 
              systems, & automating company-wide processes.
            </motion.p>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.8, ease: "easeOut" }}
              className="mt-8"
            >
              <a 
                href="/about#chatbot" 
                className="inline-block text-lg font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/about#chatbot';
                  // Scroll to chatbot after page loads
                  setTimeout(() => {
                    const chatbotElement = document.getElementById('chatbot');
                    if (chatbotElement) {
                      chatbotElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                Chat with Miles
              </a>
            </motion.div>

          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
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
                  <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-4">
                    {section}
                  </h3>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
                </div>

                <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  {(() => {
                    const projects = getProjectsByCategory(section as 'Projects' | 'Music' | 'Code');
                    if (!projects || projects.length === 0) {
                      return (
                        <p className="text-center text-neutral-500 col-span-full">
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
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
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
                    <h3 className="text-2xl font-light text-neutral-900 mb-2">
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
                            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
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
                              <h3 className="text-lg font-medium text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                                {project.title}
                              </h3>
                              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
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
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
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
        </div>
      </section>

    </div>
  );
}