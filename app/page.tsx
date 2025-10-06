'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getProjectsByCategory } from './data/projects';
import { ProjectCard } from '@/components/ProjectCard';

export default function HomePage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12"
          >
            {/* Simple placeholder for 3D cube */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
              <div className="text-white text-6xl font-bold">M</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-neutral-900 leading-tight">
              Welcome to My{' '}
              <span className="text-gradient font-medium">Portfolio</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Explore my Music, Code, and Projects. Each page showcases curated works in an 
              interactive, modern experience that blends creativity with technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/projects"
                className="btn-primary text-base px-8 py-4"
              >
                View Projects
              </Link>
              <Link
                href="/about"
                className="btn-secondary text-base px-8 py-4"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Simple Projects Preview - No Data Import Yet */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900 mb-6">
              Featured Work
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A curated selection of my latest projects across different disciplines
            </p>
          </motion.div>

          <div className="space-y-20">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-neutral-900">
              About Me
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              I'm Miles, a developer and music creator passionate about combining interactive design, 
              3D visuals, and code to craft immersive experiences. My work spans across multiple 
              disciplines, always pushing the boundaries of what's possible on the web.
            </p>
            <div className="pt-8">
              <Link
                href="/about"
                className="btn-primary text-base px-8 py-4"
              >
                Learn More About Me
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}