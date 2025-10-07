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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Project Description */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900">
              Project Overview
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></div>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {longDescription}
            </p>
          </div>

          {/* Problem & Solution */}
          {(problem || solution) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {problem && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-900">The Problem</h3>
                  <p className="text-neutral-600 leading-relaxed">{problem}</p>
                </div>
              )}
              {solution && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-900">The Solution</h3>
                  <p className="text-neutral-600 leading-relaxed">{solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Challenges & Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {challenges && challenges.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-neutral-900">Key Challenges</h3>
                <ul className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-600">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results && results.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-neutral-900">Results</h3>
                <ul className="space-y-3">
                  {results.map((result, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-600">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

