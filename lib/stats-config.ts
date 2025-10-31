/**
 * Configuration for stats ticker display
 */

export interface StatConfig {
  key: string;
  label: string;
  format?: (value: any, stats: any) => string;
  showIfZero?: boolean;
  enabled?: boolean;
}

export const STATS_CONFIG: StatConfig[] = [
  {
    key: 'pageviews',
    label: 'pageviews',
    format: (value) => value.toLocaleString(),
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'visitors',
    label: 'active now',
    format: (value) => value.toLocaleString(),
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'bounceRate',
    label: 'bounce rate',
    format: (value) => `${value.toFixed(0)}%`,
    showIfZero: true,
    enabled: true,
  },
  {
    key: 'avgSessionDuration',
    label: 'avg session',
    format: (value) => `${Math.round(value / 60)}m`,
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'projectsIndexed',
    label: 'projects indexed',
    format: (value) => String(value),
    showIfZero: true,
    enabled: true,
  },
  {
    key: 'totalDeployments',
    label: 'deployments',
    format: (value) => String(value || 0),
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'deploymentSuccessRate',
    label: 'success rate',
    format: (value, stats) => {
      if (!stats.totalDeployments || stats.totalDeployments === 0) return '0%';
      const rate = (stats.successfulDeployments || 0) / stats.totalDeployments;
      return `${Math.round(rate * 100)}%`;
    },
    showIfZero: true,
    enabled: true,
  },
  {
    key: 'totalStars',
    label: 'github stars',
    format: (value) => String(value || 0),
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'totalRepos',
    label: 'repositories',
    format: (value) => String(value || 0),
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'followers',
    label: 'followers',
    format: (value) => String(value || 0),
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'totalConversations',
    label: 'total conversations',
    format: (value) => value.toLocaleString(),
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'avgResponseTime',
    label: 'avg response time',
    format: (value) => `${value}s`,
    showIfZero: false,
    enabled: true,
  },
  {
    key: 'accuracy',
    label: 'accuracy rate',
    format: (value) => `${value}%`,
    showIfZero: true,
    enabled: true,
  },
];

/**
 * Get enabled stats that should be displayed
 */
export function getDisplayableStats(stats: Record<string, any>): StatConfig[] {
  return STATS_CONFIG.filter(config => {
    if (config.enabled === false) return false;
    
    const value = stats[config.key];
    
    // Handle computed stats
    if (config.key === 'deploymentSuccessRate') {
      return stats.totalDeployments > 0;
    }
    
    // Check if should show zero values
    if (value === 0 || value === null || value === undefined) {
      return config.showIfZero === true;
    }
    
    return true;
  });
}

