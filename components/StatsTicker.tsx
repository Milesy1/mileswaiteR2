'use client';

import { useEffect, useState } from 'react';
import { getDisplayableStats, STATS_CONFIG } from '@/lib/stats-config';

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
  totalStars?: number;
  totalRepos?: number;
  followers?: number;
  dataSource?: string;
  error?: string;
  fetchedAt?: string;
}

// Configuration: refresh interval in milliseconds
const REFRESH_INTERVAL = 30000; // 30 seconds

export default function StatsTicker() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats', {
          // Use stale-while-revalidate pattern
          next: { revalidate: 90 },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setStats(data);
        setLastError(null);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLastError(error instanceof Error ? error : new Error(String(error)));
        
        // Keep last known stats if available, otherwise set fallback
        if (!stats) {
          setStats({
            totalConversations: 0,
            todayConversations: 0,
            avgResponseTime: 0,
            projectsIndexed: 47,
            accuracy: 89,
            pageviews: 0,
            visitors: 0,
            bounceRate: 0,
            avgSessionDuration: 0,
            totalDeployments: 0,
            successfulDeployments: 0,
            lastDeploymentStatus: 'READY',
            totalStars: 0,
            totalRepos: 0,
            followers: 0,
            error: 'Stats temporarily unavailable'
          });
        }
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStats();

    // Refresh with fade animation
    const interval = setInterval(() => {
      setIsRefreshing(true);
      fetchStats();
      
      // End fade after animation
      setTimeout(() => {
        setIsRefreshing(false);
      }, 800);
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 py-3 px-4 transition-colors duration-300">
        <div className="flex items-center justify-center">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-64 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null; // Hide ticker if no stats available
  }

  // Get displayable stats based on configuration
  const displayableStats = getDisplayableStats(stats);

  if (displayableStats.length === 0) {
    return null; // Hide if no stats to display
  }

  // Create ticker items - duplicate for seamless loop
  const tickerItems = [...displayableStats, ...displayableStats];

  return (
    <div className="w-full max-w-4xl mx-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/30 dark:bg-neutral-900/30 py-3 overflow-hidden relative transition-colors duration-300">
      {/* Fade overlay for refresh animation */}
      <div 
        className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 pointer-events-none transition-opacity duration-500 z-10"
        style={{ opacity: isRefreshing ? 1 : 0 }}
      />
      <div 
        key="ticker-content"
        className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 animate-scroll"
      >
        {tickerItems.map((config, index) => {
          const value = config.key === 'deploymentSuccessRate' 
            ? config.format?.(stats.totalDeployments, stats) || '0%'
            : config.format?.(stats[config.key as keyof Stats], stats) || String(stats[config.key as keyof Stats] || 0);
          
          return (
            <div key={`${config.key}-${index}`} className="flex items-center gap-6">
              <StatItem value={value} label={config.label} />
              <Separator />
            </div>
          );
        })}
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
