'use client';

import { useEffect, useState, useRef } from 'react';

interface Stats {
  totalConversations: number;
  todayConversations: number;
  avgResponseTime: number;
  projectsIndexed: number;
  accuracy: number;
  pageviews: number;
  visitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  totalDeployments?: number;
  successfulDeployments?: number;
  lastDeploymentStatus?: string;
  dataSource?: string;
  error?: string;
}

export default function StatsTicker() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStats();

    // Combined refresh with fade animation every 10 seconds
    const interval = setInterval(() => {
      // Start fade
      setIsRefreshing(true);
      
      // Fetch new data immediately
      fetchStats();
      
      // End fade after 800ms
      setTimeout(() => {
        setIsRefreshing(false);
      }, 800);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 py-3 px-4 transition-colors duration-300">
        <div className="flex items-center justify-center">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-64 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!stats || stats.error) {
    return null; // Hide ticker if there's an error
  }

  return (
    <div className="w-full max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/30 dark:bg-neutral-900/30 py-3 overflow-hidden relative transition-colors duration-300">
      {/* Fade overlay - doesn't affect the animation */}
      <div 
        className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 pointer-events-none transition-opacity duration-500 z-10"
        style={{ opacity: isRefreshing ? 1 : 0 }}
      />
      <div 
        key="ticker-content"
        className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 animate-scroll"
      >
        {/* Ticker speed: 12.96s (30% faster total) */}
        {/* Always show Google Analytics data, even if 0 */}
        {true ? (
          <>
            <StatItem 
              value={stats.pageviews.toLocaleString()} 
              label="pageviews"
            />
            <Separator />
            <StatItem 
              value={stats.visitors.toLocaleString()} 
              label="active now"
            />
            <Separator />
            <StatItem 
              value={stats.bounceRate.toFixed(0) + '%'} 
              label="bounce rate"
            />
            <Separator />
            <StatItem 
              value={Math.round(stats.avgSessionDuration / 60) + 'm'} 
              label="avg session"
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
              label="projects indexed"
            />

            <Separator />
            <StatItem 
              value={stats.totalDeployments || 0} 
              label="deployments"
            />
            <Separator />
            <StatItem 
              value={stats.totalDeployments ? `${Math.round((stats.successfulDeployments! / stats.totalDeployments) * 100)}%` : '0%'} 
              label="success rate"
            />
            <Separator />
            {/* Duplicate for seamless loop */}
            <StatItem 
              value={stats.pageviews.toLocaleString()} 
              label="pageviews"
            />
            <Separator />
            <StatItem 
              value={stats.visitors.toLocaleString()} 
              label="active now"
            />
            <Separator />
            <StatItem 
              value={stats.bounceRate.toFixed(0) + '%'} 
              label="bounce rate"
            />
            <Separator />
            <StatItem 
              value={Math.round(stats.avgSessionDuration / 60) + 'm'} 
              label="avg session"
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
              label="projects indexed"
            />

            <Separator />
            <StatItem 
              value={stats.totalDeployments || 0} 
              label="deployments"
            />
            <Separator />
            <StatItem 
              value={stats.totalDeployments ? `${Math.round((stats.successfulDeployments! / stats.totalDeployments) * 100)}%` : '0%'} 
              label="success rate"
            />
            <Separator />
            <StatItem 
              value={stats.totalConversations.toLocaleString()} 
              label="total conversations"
            />
            <Separator />
            <StatItem 
              value={`${stats.avgResponseTime}s`} 
              label="avg response time"
            />
            <Separator />
            <StatItem 
              value={stats.accuracy + '%'} 
              label="accuracy rate"
            />
          </>
        ) : (
          <>
            <StatItem 
              value={stats?.totalConversations.toLocaleString() ?? '0'} 
              label="conversations"
            />
            <Separator />
            <StatItem 
              value={`${stats?.avgResponseTime ?? 0}s`} 
              label="avg response"
            />
            <Separator />
            <StatItem 
              value={(stats?.accuracy ?? 0) + '%'} 
              label="accuracy"
            />
            <Separator />
            <StatItem 
              value={stats?.projectsIndexed ?? 0} 
              label="projects indexed"
            />
            <Separator />
            {/* Duplicate for seamless loop */}
            <StatItem 
              value={stats?.totalConversations.toLocaleString() ?? '0'} 
              label="conversations"
            />
            <Separator />
            <StatItem 
              value={`${stats?.avgResponseTime ?? 0}s`} 
              label="avg response"
            />
            <Separator />
            <StatItem 
              value={(stats?.accuracy ?? 0) + '%'} 
              label="accuracy"
            />
            <Separator />
            <StatItem 
              value={stats?.projectsIndexed ?? 0} 
              label="projects indexed"
            />
          </>
        )}
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-medium text-neutral-900 dark:text-neutral-100">{value}</span>
      <span className="text-xs text-neutral-500 dark:text-neutral-500">{label}</span>
    </div>
  );
}

function Separator() {
  return <span className="text-neutral-300 dark:text-neutral-600">•</span>;
}
