import { NextResponse } from 'next/server';
import { retryWithBackoff, fetchWithTimeout } from '@/lib/stats-utils';

// Cache responses for 90 seconds (stale-while-revalidate)
export const revalidate = 90;

// Type definitions
interface GitHubRepo {
  stargazers_count: number;
  [key: string]: unknown;
}

interface GitHubUser {
  followers: number;
  [key: string]: unknown;
}

interface VercelDeployment {
  state: string;
  [key: string]: unknown;
}

interface VercelDeploymentsResponse {
  deployments: VercelDeployment[];
  pagination?: {
    next?: string;
  };
}

export async function GET() {
  try {
    const axiomToken = process.env.AXIOM_TOKEN;
    const axiomDataset = process.env.AXIOM_DATASET || 'your-dataset-name';
    const vercelToken = process.env.VERCEL_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID || process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;
    const githubToken = process.env.GITHUB_TOKEN;

    // Fetch GitHub stats
    let githubStats = {
      totalStars: 0,
      totalRepos: 0,
      totalCommits: 0,
      followers: 0
    };

    if (githubToken) {
      try {
        // Fetch user stats with retry and timeout
        const userResponse = await retryWithBackoff(async () => {
          return fetchWithTimeout('https://api.github.com/user', {
            headers: {
              'Authorization': `Bearer ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }, 8000);
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          
          // Fetch all repositories with pagination
          let allRepos: GitHubRepo[] = [];
          let page = 1;
          let hasMore = true;
          
          while (hasMore && page <= 10) { // Limit to 10 pages (1000 repos max) to prevent infinite loops
            try {
              const reposResponse = await retryWithBackoff(async () => {
                return fetchWithTimeout(
                  `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated&affiliation=owner`,
                  {
                    headers: {
                      'Authorization': `Bearer ${githubToken}`,
                      'Accept': 'application/vnd.github.v3+json',
                    },
                  },
                  8000
                );
              });

              if (reposResponse.ok) {
                const reposData = await reposResponse.json() as GitHubRepo[];
                
                if (reposData.length === 0) {
                  hasMore = false;
                } else {
                  allRepos = allRepos.concat(reposData);
                  // Check if there are more pages
                  const linkHeader = reposResponse.headers.get('link');
                  hasMore = linkHeader?.includes('rel="next"') ?? false;
                  page++;
                }
              } else {
                hasMore = false;
                console.warn(`GitHub repos API returned status: ${reposResponse.status}`);
              }
            } catch (error) {
              console.warn(`Failed to fetch GitHub repos page ${page}:`, error);
              hasMore = false;
            }
          }
          
          const totalStars = allRepos.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0);
          
          githubStats = {
            totalStars,
            totalRepos: allRepos.length,
            totalCommits: 0, // Would need to fetch from each repo
            followers: (userData as GitHubUser).followers
          };
          
          console.log('GitHub stats fetched:', githubStats);
        } else {
          console.warn(`GitHub user API returned status: ${userResponse.status}`);
        }
      } catch (error) {
        console.warn('Failed to fetch GitHub stats:', error);
      }
    }

    // Fetch Vercel deployment stats
    let vercelDeploymentStats = {
      totalDeployments: 0,
      successfulDeployments: 0,
      lastDeploymentStatus: 'READY'
    };

    if (vercelToken && vercelProjectId) {
      try {
        // Fetch all deployments with pagination and retry logic
        let allDeployments: VercelDeployment[] = [];
        let until: string | undefined = undefined;
        let hasMore = true;
        let pageCount = 0;
        const maxPages = 20; // Limit to prevent excessive API calls
        
        while (hasMore && pageCount < maxPages) {
          try {
            let url = `https://api.vercel.com/v6/deployments?projectId=${vercelProjectId}&limit=100`;
            if (until) {
              url += `&until=${until}`;
            }
            
            const deploymentsResponse = await retryWithBackoff(async () => {
              return fetchWithTimeout(url, {
                headers: {
                  Authorization: `Bearer ${vercelToken}`,
                },
              }, 8000);
            });

            if (deploymentsResponse.ok) {
              const deploymentsData = await deploymentsResponse.json() as VercelDeploymentsResponse;
              const deployments = deploymentsData.deployments || [];
              
              if (deployments.length === 0) {
                hasMore = false;
              } else {
                allDeployments = allDeployments.concat(deployments);
                // Check if there are more pages
                const pagination = deploymentsData.pagination;
                if (pagination && pagination.next) {
                  until = pagination.next;
                  pageCount++;
                } else {
                  hasMore = false;
                }
              }
            } else {
              hasMore = false;
              console.warn(`Vercel deployments API returned status: ${deploymentsResponse.status}`);
            }
          } catch (error) {
            console.warn(`Failed to fetch Vercel deployments page ${pageCount + 1}:`, error);
            hasMore = false;
          }
        }
        
        vercelDeploymentStats = {
          totalDeployments: allDeployments.length,
          successfulDeployments: allDeployments.filter((d: VercelDeployment) => d.state === 'READY').length,
          lastDeploymentStatus: allDeployments[0]?.state || 'READY'
        };
        
        console.log('Vercel deployment stats fetched:', vercelDeploymentStats);
      } catch (error) {
        console.warn('Failed to fetch Vercel deployment stats:', error);
      }
    }

    // Fetch Vercel Analytics data
    let vercelStats = {
      pageviews: 0,
      visitors: 0,
      bounceRate: 0,
      avgSessionDuration: 0
    };

    // Check if we're in development/localhost
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                          process.env.VERCEL_ENV === 'development' ||
                          !process.env.VERCEL;

    // Note: Vercel Analytics doesn't provide a server-side API
    // Analytics data is only available through the Vercel Dashboard
    // Don't generate fake data in development - only use real Google Analytics data

    // Google Analytics integration
    const gaPropertyId = process.env.GA_PROPERTY_ID;
    const gaCredentials = process.env.GA_CREDENTIALS;
    const gaCredentialsPath = process.env.GA_CREDENTIALS_PATH;

    if (gaPropertyId && (gaCredentials || gaCredentialsPath)) {
      try {
        // Google Analytics Data API v1
        const { BetaAnalyticsDataClient } = await import('@google-analytics/data/build/src/index.js');
        
        let credentials;
        if (gaCredentials) {
          // Use credentials from environment variable
          credentials = JSON.parse(gaCredentials);
        } else if (gaCredentialsPath) {
          // Use credentials from file path
          const fs = await import('fs');
          credentials = JSON.parse(fs.readFileSync(gaCredentialsPath, 'utf8'));
        }
        
        const analyticsDataClient = new BetaAnalyticsDataClient({
          credentials: credentials,
        });

        // Get real-time analytics data
        const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
          property: `properties/${gaPropertyId}`,
          metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
          ],
          dimensions: [
            { name: 'country' },
          ],
        });

        // Get historical data for bounce rate and session duration
        const [historicalResponse] = await analyticsDataClient.runReport({
          property: `properties/${gaPropertyId}`,
          dateRanges: [
            {
              startDate: '30daysAgo',
              endDate: 'today',
            },
          ],
          metrics: [
            { name: 'sessions' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
          ],
        });

        // Extract data from responses
        const realtimeData = realtimeResponse.rows?.[0]?.metricValues || [];
        const historicalData = historicalResponse.rows?.[0]?.metricValues || [];

        vercelStats = {
          pageviews: parseInt(historicalData[1]?.value || '0'),
          visitors: parseInt(realtimeData[0]?.value || '0'),
          bounceRate: Math.round(parseFloat(historicalData[2]?.value || '0') * 100),
          avgSessionDuration: Math.round(parseFloat(historicalData[3]?.value || '0'))
        };

        console.log('Google Analytics data fetched successfully:', vercelStats);
      } catch (error) {
        console.warn('Failed to fetch Google Analytics data:', error);
        // In development, don't use fake data - keep zeros
        // In production, you might want to show zeros or handle differently
        if (!isDevelopment) {
          console.log('No analytics data available - showing zeros');
        }
      }
    } else {
      // No Google Analytics configured
      if (isDevelopment) {
        console.log('Development mode: No Google Analytics configured - showing zeros');
      } else {
        console.log('Production mode: No Google Analytics configured - showing zeros');
      }
      // Always show zeros when analytics isn't configured
      vercelStats = {
        pageviews: 0,
        visitors: 0,
        bounceRate: 0,
        avgSessionDuration: 0
      };
    }

    // Fetch Axiom stats in parallel if token is available
    let axiomStats = {
      totalConversations: 0,
      todayConversations: 0,
      avgResponseTime: 0,
    };

    if (axiomToken) {
      try {
        // Parallel fetch all Axiom queries
        const [totalData, avgData, todayData] = await Promise.allSettled([
          retryWithBackoff(async () => {
            const response = await fetchWithTimeout(
              `https://api.axiom.co/v1/datasets/${axiomDataset}/query`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${axiomToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  apl: "['chatbot_conversation'] | count",
                  startTime: '2024-01-01T00:00:00Z',
                  endTime: new Date().toISOString(),
                }),
              },
              10000
            );
            return response.json();
          }),
          retryWithBackoff(async () => {
            const response = await fetchWithTimeout(
              `https://api.axiom.co/v1/datasets/${axiomDataset}/query`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${axiomToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  apl: "['chatbot_conversation'] | summarize avg(responseTime)",
                  startTime: '2024-01-01T00:00:00Z',
                  endTime: new Date().toISOString(),
                }),
              },
              10000
            );
            return response.json();
          }),
          retryWithBackoff(async () => {
            const response = await fetchWithTimeout(
              `https://api.axiom.co/v1/datasets/${axiomDataset}/query`,
              {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${axiomToken}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  apl: "['chatbot_conversation'] | where _time > ago(24h) | count",
                }),
              },
              10000
            );
            return response.json();
          }),
        ]);

        // Extract values from Axiom responses with error handling
        if (totalData.status === 'fulfilled') {
          axiomStats.totalConversations = totalData.value.matches?.[0]?._count || 0;
        }
        if (avgData.status === 'fulfilled') {
          const avgResponseTimeMs = avgData.value.matches?.[0]?.['avg(responseTime)'] || 0;
          axiomStats.avgResponseTime = parseFloat((avgResponseTimeMs / 1000).toFixed(1));
        }
        if (todayData.status === 'fulfilled') {
          axiomStats.todayConversations = todayData.value.matches?.[0]?._count || 0;
        }
      } catch (error) {
        console.warn('Failed to fetch Axiom stats:', error);
      }
    }

    // Combine all stats
    const allStats = {
      ...axiomStats,
      projectsIndexed: 47, // Update this manually when you add projects
      accuracy: 89, // Hardcoded for now, calculate from feedback later
      ...vercelStats,
      ...vercelDeploymentStats,
      ...githubStats,
      dataSource: axiomToken ? 'axiom-vercel-and-github' : 'vercel-and-github',
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(allStats, {
      headers: {
        'Cache-Control': 'public, s-maxage=90, stale-while-revalidate=180',
      },
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    
    // Return partial data with error flag for graceful degradation
    return NextResponse.json({
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
      error: 'Unable to fetch live stats',
      fetchedAt: new Date().toISOString(),
    }, { 
      status: 200, // Return 200 so client can still display partial data
      headers: {
        'Cache-Control': 'public, s-maxage=60',
      },
    });
  }
}
