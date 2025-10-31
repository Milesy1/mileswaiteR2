import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/database';

/**
 * Debug endpoint to test study lookup
 * Visit: /api/debug/test-study?id=123e4567-e89b-12d3-a456-426614174000
 * Only available in development
 */
export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const studyId = searchParams.get('id') || '123e4567-e89b-12d3-a456-426614174000';

    // Test 1: Direct query without UUID cast
    const result1 = await query(
      `SELECT id, name, system_type FROM studies WHERE id = $1`,
      [studyId]
    );

    // Test 2: Query with UUID cast
    const result2 = await query(
      `SELECT id, name, system_type FROM studies WHERE id = $1::uuid`,
      [studyId]
    );

    // Test 3: Check DATABASE_URL
    const hasDbUrl = !!process.env.DATABASE_URL;
    const dbUrlPreview = process.env.DATABASE_URL 
      ? process.env.DATABASE_URL.substring(0, 30) + '...' 
      : 'NOT SET';

    return NextResponse.json({
      studyId,
      test1_noCast: {
        rowCount: result1.rows.length,
        rows: result1.rows
      },
      test2_withCast: {
        rowCount: result2.rows.length,
        rows: result2.rows
      },
      database: {
        hasUrl: hasDbUrl,
        urlPreview: dbUrlPreview
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({
      error: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
}



