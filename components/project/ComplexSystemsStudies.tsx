'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface StudyData {
  id: string;
  name: string;
  system_type: string;
  description: string;
  metrics?: Array<{
    metric_name: string;
    value: number;
  }>;
}

export function ComplexSystemsStudies() {
  const [studies, setStudies] = useState<StudyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch studies data
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch('/api/studies/chaos?system_type=lorenz&limit=2');
        if (!response.ok) {
          throw new Error('Failed to fetch studies');
        }
        const data = await response.json();
        setStudies(data.studies || []);
      } catch (err) {
        console.error('Error fetching studies:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Header */}
          <div className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 dark:text-neutral-100">
              Research Studies
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Live computational studies exploring the boundaries of chaos and complexity.
            </p>
          </div>

          {/* Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Lorenz Attractor Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Visualization Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-primary-500/30 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-primary-500/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Lorenz Attractor
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">
                    Classical chaotic system exhibiting strange attractor behavior. 
                    Small changes in initial conditions lead to dramatically different outcomes.
                  </p>
                  
                  {/* Live Metrics */}
                  <div className="space-y-2 mb-6">
                    {loading ? (
                      <div className="space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/4"></div>
                      </div>
                    ) : error ? (
                      <p className="text-sm text-red-500">Failed to load metrics</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-500 dark:text-neutral-400">Lyapunov Exponent:</span>
                          <span className="ml-2 font-mono text-primary-600 dark:text-primary-400">0.9056</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 dark:text-neutral-400">Dimension:</span>
                          <span className="ml-2 font-mono text-primary-600 dark:text-primary-400">2.05</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href="/complex-systems/lorenz"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 mt-auto"
                  >
                    <span>Explore Study</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Logistic Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Visualization Placeholder */}
                <div className="h-48 bg-gradient-to-br from-accent-500/10 to-primary-500/10 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-accent-500/30 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 border border-accent-500/50 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Logistic Map
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow">
                    Simple quadratic recurrence relation that exhibits complex behavior. 
                    Demonstrates period-doubling route to chaos and Feigenbaum constants.
                  </p>
                  
                  {/* Live Metrics */}
                  <div className="space-y-2 mb-6">
                    {loading ? (
                      <div className="space-y-2">
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/4"></div>
                      </div>
                    ) : error ? (
                      <p className="text-sm text-red-500">Failed to load metrics</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-500 dark:text-neutral-400">Feigenbaum:</span>
                          <span className="ml-2 font-mono text-accent-600 dark:text-accent-400">4.669</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 dark:text-neutral-400">Bifurcations:</span>
                          <span className="ml-2 font-mono text-accent-600 dark:text-accent-400">∞</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href="/complex-systems/logistic"
                    className="inline-flex items-center text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors duration-200 mt-auto"
                  >
                    <span>Explore Study</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
