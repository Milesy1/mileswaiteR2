import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set, returning empty studies array');
      return NextResponse.json({
        studies: [],
        total: 0,
        system_type: 'all',
        message: 'Database not configured'
      }, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    const { searchParams } = new URL(request.url);
    const systemType = searchParams.get('system_type');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const refresh = searchParams.get('refresh') === '1';

    // For now, we'll use a simple query approach
    // TODO: Implement proper listAllStudies method in ComplexSystemsData
    let sql = 'SELECT id, name, system_type, description, date_conducted, metadata, created_at, updated_at FROM studies';
    const params: (string | number)[] = [];
    
    if (systemType) {
      sql += ' WHERE system_type = $1';
      params.push(systemType);
    }
    
    sql += ' ORDER BY date_conducted DESC, created_at DESC';
    
    if (limit) {
      sql += ` LIMIT $${params.length + 1}`;
      params.push(limit);
    }

    console.log('Executing query:', sql, 'with params:', params);
    const result = await query(sql, params);

    interface StudyRow {
      id: string;
      name: string;
      system_type: string;
      description?: string;
      date_conducted?: string;
      metadata?: unknown;
      created_at?: string;
      updated_at?: string;
    }

    const studies = result.rows.map((row: StudyRow) => ({
      ...row,
      parameters: [], // Will be loaded separately if needed
      initial_conditions: []
    }));

    return NextResponse.json({
      studies,
      total: studies.length,
      system_type: systemType || 'all'
    }, {
      status: 200,
      headers: {
        'Cache-Control': refresh ? 'no-cache' : 'public, max-age=3600'
      }
    });

  } catch (error) {
    console.error('Error fetching chaos studies:', error);
    
    // If database connection error, return empty array gracefully
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isDatabaseError = errorMessage.includes('DATABASE_URL') || 
                           errorMessage.includes('connection') ||
                           errorMessage.includes('Database connection');
    
    if (isDatabaseError) {
      console.warn('Database unavailable, returning empty studies array');
      return NextResponse.json({
        studies: [],
        total: 0,
        system_type: 'all',
        message: 'Database unavailable'
      }, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60'
        }
      });
    }
    
    // For other errors, return error response
    interface ErrorResponse {
      error: string;
      message: string;
      details?: string;
      errorType?: string;
      hasDatabaseUrl?: boolean;
    }

    const errorResponse: ErrorResponse = {
      error: 'Failed to fetch studies',
      message: errorMessage,
    };
    
    if (process.env.NODE_ENV === 'development') {
      errorResponse.details = error instanceof Error ? error.stack : String(error);
      errorResponse.errorType = error instanceof Error ? error.constructor.name : typeof error;
      errorResponse.hasDatabaseUrl = !!process.env.DATABASE_URL;
    }
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
