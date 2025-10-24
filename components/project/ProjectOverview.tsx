'use client';

import { motion } from 'framer-motion';
import VoiceAskMilesButton from './VoiceAskMilesButton';

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
            <div className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-4">
              {longDescription.split('<br><br>').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
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
              <VoiceAskMilesButton />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

