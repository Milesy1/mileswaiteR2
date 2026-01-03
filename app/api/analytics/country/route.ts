import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const gaPropertyId = process.env.GA_PROPERTY_ID;
    const gaCredentials = process.env.GA_CREDENTIALS;
    const gaCredentialsPath = process.env.GA_CREDENTIALS_PATH;

    if (!gaPropertyId || (!gaCredentials && !gaCredentialsPath)) {
      return NextResponse.json({
        error: 'Google Analytics not configured',
        message: 'Missing GA_PROPERTY_ID or GA_CREDENTIALS'
      }, { status: 500 });
    }

    const { BetaAnalyticsDataClient } = await import('@google-analytics/data/build/src/index.js');
    
    let credentials;
    if (gaCredentials) {
      credentials = JSON.parse(gaCredentials);
    } else if (gaCredentialsPath) {
      const fs = await import('fs');
      credentials = JSON.parse(fs.readFileSync(gaCredentialsPath, 'utf8'));
    }
    
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: credentials,
    });

    // Get historical data with country breakdown (last 30 days)
    const [historicalResponse] = await analyticsDataClient.runReport({
      property: `properties/${gaPropertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
      ],
      dimensions: [
        { name: 'country' },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'country',
          stringFilter: {
            matchType: 'EXACT',
            value: 'Palestine'
          }
        }
      },
    });

    // Also check for common variations
    const variations = ['Palestinian Territory', 'State of Palestine', 'Palestinian Territories'];
    const allResponses = [historicalResponse];
    
    for (const variant of variations) {
      try {
        const [variantResponse] = await analyticsDataClient.runReport({
          property: `properties/${gaPropertyId}`,
          dateRanges: [
            {
              startDate: '30daysAgo',
              endDate: 'today',
            },
          ],
          metrics: [
            { name: 'activeUsers' },
            { name: 'sessions' },
            { name: 'screenPageViews' },
          ],
          dimensions: [
            { name: 'country' },
          ],
          dimensionFilter: {
            filter: {
              fieldName: 'country',
              stringFilter: {
                matchType: 'EXACT',
                value: variant
              }
            }
          },
        });
        allResponses.push(variantResponse);
      } catch (err) {
        // Ignore errors for variants
      }
    }

    // Get all countries for context (top 20)
    const [allCountriesResponse] = await analyticsDataClient.runReport({
      property: `properties/${gaPropertyId}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        { name: 'activeUsers' },
      ],
      dimensions: [
        { name: 'country' },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'activeUsers'
          },
          desc: true
        }
      ],
      limit: 20
    });

    // Process Palestine data
    const palestineData: Array<{ country: string; users: number; sessions: number; pageviews: number }> = [];
    
    for (const response of allResponses) {
      if (response.rows && response.rows.length > 0) {
        for (const row of response.rows) {
          const country = row.dimensionValues?.[0]?.value || 'Unknown';
          const users = parseInt(row.metricValues?.[0]?.value || '0');
          const sessions = parseInt(row.metricValues?.[1]?.value || '0');
          const pageviews = parseInt(row.metricValues?.[2]?.value || '0');
          
          if (users > 0 || sessions > 0 || pageviews > 0) {
            palestineData.push({ country, users, sessions, pageviews });
          }
        }
      }
    }

    // Process all countries data
    const allCountries = allCountriesResponse.rows?.map(row => ({
      country: row.dimensionValues?.[0]?.value || 'Unknown',
      users: parseInt(row.metricValues?.[0]?.value || '0')
    })) || [];

    return NextResponse.json({
      palestine: {
        found: palestineData.length > 0,
        data: palestineData,
        totalUsers: palestineData.reduce((sum, d) => sum + d.users, 0),
        totalSessions: palestineData.reduce((sum, d) => sum + d.sessions, 0),
        totalPageviews: palestineData.reduce((sum, d) => sum + d.pageviews, 0)
      },
      topCountries: allCountries,
      period: 'Last 30 days'
    });

  } catch (error) {
    console.error('Error fetching country data:', error);
    return NextResponse.json({
      error: 'Failed to fetch analytics data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

