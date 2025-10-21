'use client';

import { motion } from 'framer-motion';

interface ProjectOverviewProps {
  description: string;
  longDescription: string;
  problem?: string;
  solution?: string;
  challenges?: string[];
  results?: string[];
}

export function ProjectOverview({ 
  description, 
  longDescription, 
  problem, 
  solution, 
  challenges, 
  results 
}: ProjectOverviewProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-16"
        >
          {/* Project Description */}
          <div className="space-y-6" data-section="project-overview">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 dark:text-neutral-100">
              Project Overview
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {longDescription}
            </p>
          </div>

          {/* Problem & Solution */}
          {(problem || solution) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {problem && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">The Problem</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{problem}</p>
                </div>
              )}
              {solution && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">The Solution</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Challenges & Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {challenges && challenges.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Key Challenges</h3>
                <ul className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-600 dark:text-neutral-400">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results && results.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Results</h3>
                <ul className="space-y-3">
                  {results.map((result, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-600 dark:text-neutral-400">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Questions CTA */}
          <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="text-center space-y-4">
              <p className="text-neutral-600 dark:text-neutral-400">
                Questions about this project?
              </p>
              <a 
                href="/about#chatbot" 
                className="inline-flex items-center px-6 py-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200 text-sm font-medium min-h-[44px] touch-manipulation"
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
                Ask Miles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

