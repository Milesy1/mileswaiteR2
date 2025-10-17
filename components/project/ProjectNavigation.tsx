'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllProjectSlugs, getProjectBySlug } from '../../app/data/projects';

interface ProjectNavigationProps {
  currentSlug: string;
}

export function ProjectNavigation({ currentSlug }: ProjectNavigationProps) {
  const allSlugs = getAllProjectSlugs();
  const currentIndex = allSlugs.indexOf(currentSlug);
  
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
  
  const prevProject = prevSlug ? getProjectBySlug(prevSlug) : null;
  const nextProject = nextSlug ? getProjectBySlug(nextSlug) : null;

  return (
    <section className="py-20 lg:py-32 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 mb-6">
              More Projects
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Previous Project */}
            {prevProject && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100 group-hover:border-primary-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                        <svg
                          className="w-5 h-5 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                        Previous Project
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                      {prevProject.title}
                    </h3>
                    <p className="text-neutral-600 line-clamp-2">
                      {prevProject.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Next Project */}
            {nextProject && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={!prevProject ? 'lg:col-start-2' : ''}
              >
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-neutral-100 group-hover:border-primary-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                        Next Project
                      </span>
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                        <svg
                          className="w-5 h-5 text-primary-600"
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
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                      {nextProject.title}
                    </h3>
                    <p className="text-neutral-600 line-clamp-2">
                      {nextProject.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Back to Projects */}
          <div className="text-center pt-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to All Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
