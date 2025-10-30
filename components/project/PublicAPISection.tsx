'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function PublicAPISection() {
  return (
    <section id="api" className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
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
              Public API
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Access live complex systems data through our RESTful API with built-in caching and rate limiting.
            </p>
          </div>

          {/* API Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Fast & Cached</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Redis-powered caching with sub-100ms response times</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Rate Limited</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Fair usage with sliding window rate limiting</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">TypeScript</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Fully typed responses and comprehensive documentation</p>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-neutral-900 dark:bg-neutral-800 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Get Lorenz Trajectory Data</h3>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-neutral-400 mb-2">Request:</div>
              <pre className="bg-neutral-800 dark:bg-neutral-700 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400">
{`fetch('/api/studies/lorenz/1/trajectory?sample=100')
  .then(response => response.json())
  .then(data => {
    console.log('Trajectory points:', data.points);
    console.log('Cache status:', response.headers.get('X-Cache'));
    console.log('Rate limit remaining:', response.headers.get('X-RateLimit-Remaining'));
  });`}
                </code>
              </pre>
              
              <div className="text-sm text-neutral-400 mb-2">Response:</div>
              <pre className="bg-neutral-800 dark:bg-neutral-700 rounded-lg p-4 overflow-x-auto">
                <code className="text-blue-400">
{`{
  "study_id": "uuid",
  "points": [
    {
      "timestep": 0,
      "time": 0.0,
      "x": 1.0,
      "y": 1.0,
      "z": 1.0
    }
  ],
  "total_points": 1000,
  "sampled": true,
  "sample_size": 100
}`}
                </code>
              </pre>
            </div>
          </div>

          {/* Rate Limits Info */}
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Rate Limits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Endpoint Types</h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• <strong>List endpoints:</strong> 100 requests/hour</li>
                  <li>• <strong>Detail endpoints:</strong> 100 requests/hour</li>
                  <li>• <strong>Heavy data:</strong> 50 requests/hour</li>
                  <li>• <strong>Metrics:</strong> 100 requests/hour</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">Headers</h4>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• <code>X-RateLimit-Limit</code> - Your limit</li>
                  <li>• <code>X-RateLimit-Remaining</code> - Requests left</li>
                  <li>• <code>X-RateLimit-Reset</code> - Reset timestamp</li>
                  <li>• <code>X-Cache</code> - Cache hit/miss status</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Documentation Link */}
          <div className="text-center">
            <Link
              href="/complex-systems/api"
              className="inline-flex items-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <span className="font-medium">View Full API Documentation</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
