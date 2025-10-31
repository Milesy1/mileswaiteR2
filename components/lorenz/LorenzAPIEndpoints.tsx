'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface LorenzAPIEndpointsProps {
  studyId: string;
}

export function LorenzAPIEndpoints({ studyId }: LorenzAPIEndpointsProps) {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const endpoints = [
    {
      method: 'GET',
      path: `/api/studies/lorenz/${studyId}`,
      description: 'Get complete study details including parameters, initial conditions, and metrics',
      cacheTTL: '24 hours',
      rateLimit: '100/hour',
      example: `curl -X GET "https://mileswaite.net/api/studies/lorenz/${studyId}"`,
      response: 'LorenzStudyResponse'
    },
    {
      method: 'GET',
      path: `/api/studies/lorenz/${studyId}/trajectory`,
      description: 'Get trajectory data with optional sampling parameter',
      cacheTTL: '1 hour',
      rateLimit: '50/hour',
      example: `curl -X GET "https://mileswaite.net/api/studies/lorenz/${studyId}/trajectory?sample=1000"`,
      response: 'TrajectoryResponse'
    },
    {
      method: 'GET',
      path: `/api/studies/lorenz/${studyId}/metrics`,
      description: 'Get chaos metrics including Lyapunov exponents and correlation dimension',
      cacheTTL: '24 hours',
      rateLimit: '100/hour',
      example: `curl -X GET "https://mileswaite.net/api/studies/lorenz/${studyId}/metrics"`,
      response: 'MetricsResponse'
    }
  ];

  const copyToClipboard = async (text: string, endpoint: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(endpoint);
      setTimeout(() => setCopiedEndpoint(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'POST':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200';
    }
  };

  const getCacheColor = (ttl: string) => {
    if (ttl.includes('24 hours')) return 'text-green-600 dark:text-green-400';
    if (ttl.includes('1 hour')) return 'text-yellow-600 dark:text-yellow-400';
    if (ttl.includes('30 min')) return 'text-orange-600 dark:text-orange-400';
    return 'text-neutral-600 dark:text-neutral-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          API Endpoints
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Available API endpoints for this Lorenz study with caching and rate limiting information
        </p>
      </div>

      {/* Endpoints List */}
      <div className="space-y-6">
        {endpoints.map((endpoint, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="border border-neutral-200 dark:border-neutral-600 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
          >
            {/* Method and Path */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getMethodColor(endpoint.method)}`}>
                  {endpoint.method}
                </span>
                <code className="text-lg font-mono text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded">
                  {endpoint.path}
                </code>
              </div>
              <button
                onClick={() => copyToClipboard(endpoint.example, endpoint.path)}
                className="flex items-center px-3 py-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
              >
                {copiedEndpoint === endpoint.path ? (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {endpoint.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-neutral-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 mr-2">Cache TTL:</span>
                <span className={`text-sm font-medium ${getCacheColor(endpoint.cacheTTL)}`}>
                  {endpoint.cacheTTL}
                </span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-neutral-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 mr-2">Rate Limit:</span>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {endpoint.rateLimit}
                </span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-neutral-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 mr-2">Response:</span>
                <span className="text-sm font-mono text-primary-600 dark:text-primary-400">
                  {endpoint.response}
                </span>
              </div>
            </div>

            {/* Example */}
            <div className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-400">Example Request</span>
                <button
                  onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                  className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
                >
                  {copiedEndpoint === `example-${index}` ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <code className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                {endpoint.example}
              </code>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rate Limiting Info */}
      <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Rate Limiting & Caching
            </h3>
            <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <p>• <strong>Rate Limits:</strong> Applied per IP address using sliding window algorithm</p>
              <p>• <strong>Caching:</strong> Redis-backed with automatic cache invalidation</p>
              <p>• <strong>Headers:</strong> All responses include X-RateLimit-* and X-Cache headers</p>
              <p>• <strong>Heavy Data:</strong> Trajectory endpoints have lower limits (50/hour) due to data size</p>
            </div>
          </div>
        </div>
      </div>

      {/* API Documentation Link */}
      <div className="mt-6 text-center">
        <a
          href="/complex-systems/api"
          className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          View Complete API Documentation
        </a>
      </div>
    </motion.div>
  );
}




