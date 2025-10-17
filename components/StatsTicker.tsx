'use client';

import { useEffect, useState } from 'react';

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
  dataSource?: string;
  error?: string;
}

export default function StatsTicker() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 10 seconds
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto border-t border-neutral-200 bg-white/50 py-3 px-4">
        <div className="flex items-center justify-center">
          <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!stats || stats.error) {
    return null; // Hide ticker if there's an error
  }

  return (
    <div className="w-full max-w-4xl mx-auto border-t border-neutral-200 bg-white/30 py-3 overflow-hidden">
      <div className="flex items-center gap-6 text-sm text-neutral-600 animate-scroll">
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
          </>
        ) : (
          <>
            <StatItem 
              value={stats.totalConversations.toLocaleString()} 
              label="conversations" 
            />
            <Separator />
            <StatItem 
              value={`${stats.avgResponseTime}s`} 
              label="avg response" 
            />
            <Separator />
            <StatItem 
              value={stats.accuracy + '%'} 
              label="accuracy" 
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
              label="projects indexed" 
            />
            <Separator />
            {/* Duplicate for seamless loop */}
            <StatItem 
              value={stats.totalConversations.toLocaleString()} 
              label="conversations" 
            />
            <Separator />
            <StatItem 
              value={`${stats.avgResponseTime}s`} 
              label="avg response" 
            />
            <Separator />
            <StatItem 
              value={stats.accuracy + '%'} 
              label="accuracy" 
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
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
      <span className="font-medium text-neutral-900">{value}</span>
      <span className="text-xs text-neutral-500">{label}</span>
    </div>
  );
}

function Separator() {
  return <span className="text-neutral-300">•</span>;
}
