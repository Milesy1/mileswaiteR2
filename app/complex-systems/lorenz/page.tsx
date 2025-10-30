'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LorenzIndexPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] min-h-[300px] sm:min-h-[400px] overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">
                Lorenz Attractor Studies
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto px-4">
                Explore detailed analyses of Lorenz attractor dynamics and chaos metrics through computational studies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Studies Grid */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Available Studies
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Select a study to explore detailed analysis and interactive visualizations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Classic Lorenz Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="h-48 bg-gradient-to-br from-primary-500/10 to-accent-500/10 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-primary-500/30 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border border-primary-500/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Classic Lorenz Study
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Standard parameters: σ=10, ρ=28, β=8/3. The foundational study of chaotic dynamics.
                  </p>
                  
                  <div className="space-y-2 mb-6">
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
                  </div>
                  
                  <Link
                    href="/complex-systems/lorenz/123e4567-e89b-12d3-a456-426614174000"
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    <span>Explore Study</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* High Reynolds Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="h-48 bg-gradient-to-br from-accent-500/10 to-primary-500/10 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-accent-500/30 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 border border-accent-500/50 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    High Reynolds Study
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Extended parameter range analysis exploring the transition to turbulence.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-500 dark:text-neutral-400">Reynolds:</span>
                        <span className="ml-2 font-mono text-accent-600 dark:text-accent-400">1000+</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 dark:text-neutral-400">Regime:</span>
                        <span className="ml-2 font-mono text-accent-600 dark:text-accent-400">Turbulent</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/complex-systems/lorenz/00000000-0000-0000-0000-000000000001"
                    className="inline-flex items-center text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors duration-200"
                  >
                    <span>Explore Study</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Bifurcation Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="h-48 bg-gradient-to-br from-green-500/10 to-blue-500/10 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-green-500/30 rounded-lg flex items-center justify-center">
                    <div className="w-16 h-16 border border-green-500/50 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    Bifurcation Analysis
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    Comprehensive parameter space exploration revealing the route to chaos.
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-500 dark:text-neutral-400">Parameters:</span>
                        <span className="ml-2 font-mono text-green-600 dark:text-green-400">1000+</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 dark:text-neutral-400">Bifurcations:</span>
                        <span className="ml-2 font-mono text-green-600 dark:text-green-400">∞</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/complex-systems/lorenz/00000000-0000-0000-0000-000000000002"
                    className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
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

          {/* API Access Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                API Access
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Access study data programmatically via our RESTful API
              </p>
              <div className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-4 text-left max-w-2xl mx-auto">
                <code className="text-green-400 text-sm">
                  GET /api/studies/lorenz/[study-id]
                </code>
              </div>
              <Link
                href="/complex-systems/api"
                className="inline-flex items-center mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                <span>View API Documentation</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
