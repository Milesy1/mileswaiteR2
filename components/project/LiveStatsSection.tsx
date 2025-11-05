'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface StatsData {
  totalCalls: number;
  mostPopularStudy: string;
  averageResponseTime: number;
  cacheHitRate: number;
}

export function LiveStatsSection() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch live stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // This would be a real API endpoint that aggregates Redis data
        // For now, we'll simulate the data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalCalls: 1247,
          mostPopularStudy: 'Lorenz Attractor',
          averageResponseTime: 45,
          cacheHitRate: 87.3
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
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
            <h2 className="text-4xl sm:text-5xl font-light text-white">
              Live API Statistics
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Real-time performance metrics and usage statistics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total API Calls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {loading ? (
                      <div className="h-8 w-20 bg-white/20 rounded animate-pulse"></div>
                    ) : error ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      stats?.totalCalls.toLocaleString()
                    )}
                  </div>
                  <div className="text-sm text-neutral-400">API calls today</div>
                </div>
              </div>
            </motion.div>

            {/* Most Popular Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">
                    {loading ? (
                      <div className="h-6 w-24 bg-white/20 rounded animate-pulse"></div>
                    ) : error ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      stats?.mostPopularStudy
                    )}
                  </div>
                  <div className="text-sm text-neutral-400">Most popular</div>
                </div>
              </div>
            </motion.div>

            {/* Average Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {loading ? (
                      <div className="h-8 w-16 bg-white/20 rounded animate-pulse"></div>
                    ) : error ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      `${stats?.averageResponseTime}ms`
                    )}
                  </div>
                  <div className="text-sm text-neutral-400">Avg response time</div>
                </div>
              </div>
            </motion.div>

            {/* Cache Hit Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {loading ? (
                      <div className="h-8 w-16 bg-white/20 rounded animate-pulse"></div>
                    ) : error ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      `${stats?.cacheHitRate}%`
                    )}
                  </div>
                  <div className="text-sm text-neutral-400">Cache hit rate</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-green-400 font-medium">API is cached and fast ⚡</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}











