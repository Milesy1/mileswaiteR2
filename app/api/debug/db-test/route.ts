import { NextResponse } from 'next/server';
import { query, testConnection } from '@/lib/database';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  try {
    // Test connection
    const connectionTest = await testConnection();
    
    // Try a simple query
    let queryResult = null;
    try {
      const result = await query('SELECT COUNT(*) as count FROM studies');
      queryResult = { success: true, count: result.rows[0].count };
    } catch (queryError) {
      queryResult = { 
        success: false, 
        error: queryError instanceof Error ? queryError.message : String(queryError) 
      };
    }
    
    // Get all studies
    let studiesList = null;
    try {
      const studiesResult = await query('SELECT id, name, system_type FROM studies ORDER BY created_at DESC LIMIT 10');
      studiesList = { success: true, studies: studiesResult.rows };
    } catch (studiesError) {
      studiesList = { 
        success: false, 
        error: studiesError instanceof Error ? studiesError.message : String(studiesError) 
      };
    }
    
    // Check for trajectory data
    let trajectoryCheck = null;
    try {
      const trajResult = await query('SELECT study_id, COUNT(*) as count FROM trajectories GROUP BY study_id');
      trajectoryCheck = { success: true, trajectories: trajResult.rows };
    } catch (trajError) {
      trajectoryCheck = { 
        success: false, 
        error: trajError instanceof Error ? trajError.message : String(trajError) 
      };
    }
    
    // Check environment
    const envCheck = {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL?.length || 0,
      databaseUrlPreview: process.env.DATABASE_URL?.substring(0, 20) + '...' || 'NOT SET',
      nodeEnv: process.env.NODE_ENV
    };
    
    return NextResponse.json({
      connection: connectionTest,
      query: queryResult,
      studies: studiesList,
      trajectories: trajectoryCheck,
      environment: envCheck,
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({
      error: 'Debug endpoint failed',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

