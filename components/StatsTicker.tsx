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
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Trigger fade effect only on refresh (not initial load)
        if (stats) {
          setIsRefreshing(true);
        }
        
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        // Small delay to show the fade effect
        setTimeout(() => {
          setStats(data);
          setIsRefreshing(false);
        }, 200);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setIsRefreshing(false);
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
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.visitors.toLocaleString()} 
              label="active now"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.bounceRate.toFixed(0) + '%'} 
              label="bounce rate"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={Math.round(stats.avgSessionDuration / 60) + 'm'} 
              label="avg session"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
              label="projects indexed"
              isRefreshing={isRefreshing}
            />
            <Separator />
            {/* Duplicate for seamless loop */}
            <StatItem 
              value={stats.pageviews.toLocaleString()} 
              label="pageviews"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.visitors.toLocaleString()} 
              label="active now"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.bounceRate.toFixed(0) + '%'} 
              label="bounce rate"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={Math.round(stats.avgSessionDuration / 60) + 'm'} 
              label="avg session"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
              label="projects indexed"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.totalConversations.toLocaleString()} 
              label="total conversations"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={`${stats.avgResponseTime}s`} 
              label="avg response time"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.accuracy + '%'} 
              label="accuracy rate"
              isRefreshing={isRefreshing}
            />
          </>
        ) : (
          <>
            <StatItem 
              value={stats.totalConversations.toLocaleString()} 
              label="conversations"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={`${stats.avgResponseTime}s`} 
              label="avg response"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.accuracy + '%'} 
              label="accuracy"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
              label="projects indexed"
              isRefreshing={isRefreshing}
            />
            <Separator />
            {/* Duplicate for seamless loop */}
            <StatItem 
              value={stats.totalConversations.toLocaleString()} 
              label="conversations"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={`${stats.avgResponseTime}s`} 
              label="avg response"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.accuracy + '%'} 
              label="accuracy"
              isRefreshing={isRefreshing}
            />
            <Separator />
            <StatItem 
              value={stats.projectsIndexed} 
              label="projects indexed"
              isRefreshing={isRefreshing}
            />
          </>
        )}
      </div>
    </div>
  );
}

function StatItem({ value, label, isRefreshing }: { value: string | number; label: string; isRefreshing?: boolean }) {
  return (
    <div className="flex items-baseline gap-1.5 transition-opacity duration-300" style={{ opacity: isRefreshing ? 0.5 : 1 }}>
      <span className="font-medium text-neutral-900">{value}</span>
      <span className="text-xs text-neutral-500">{label}</span>
    </div>
  );
}

function Separator() {
  return <span className="text-neutral-300">•</span>;
}
