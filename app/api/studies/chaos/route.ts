import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const systemType = searchParams.get('system_type');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const refresh = searchParams.get('refresh') === '1';

    // For now, we'll use a simple query approach
    // TODO: Implement proper listAllStudies method in ComplexSystemsData
    let sql = 'SELECT id, name, system_type, description, date_conducted, metadata, created_at, updated_at FROM studies';
    const params: any[] = [];
    
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

    const studies = result.rows.map((row: any) => ({
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
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
    }
    
    // Always return detailed error in development
    const errorResponse: any = {
      error: 'Failed to fetch studies',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
    
    if (process.env.NODE_ENV === 'development') {
      errorResponse.details = error instanceof Error ? error.stack : String(error);
      errorResponse.errorType = error instanceof Error ? error.constructor.name : typeof error;
      errorResponse.hasDatabaseUrl = !!process.env.DATABASE_URL;
    }
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
