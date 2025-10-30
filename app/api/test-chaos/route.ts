import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

// Simple test endpoint to debug the chaos API
export async function GET() {
  try {
    console.log('=== TEST CHAOS API ===');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('DATABASE_URL preview:', process.env.DATABASE_URL?.substring(0, 30) + '...');
    
    // Test connection
    const testQuery = await query('SELECT COUNT(*) as count FROM studies WHERE system_type = $1', ['logistic']);
    console.log('Query result:', testQuery.rows);
    
    return NextResponse.json({
      success: true,
      databaseUrlExists: !!process.env.DATABASE_URL,
      queryResult: testQuery.rows[0],
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('TEST ERROR:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      hasDatabaseUrl: !!process.env.DATABASE_URL
    }, { status: 500 });
  }
}

