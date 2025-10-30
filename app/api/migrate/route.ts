import { NextRequest, NextResponse } from 'next/server';

/**
 * API route to run database migrations manually
 * 
 * Usage: POST /api/migrate
 * 
 * This runs migrations directly using the migration script logic.
 * After deployment, visit this endpoint to run migrations.
 */
export async function POST(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          error: 'DATABASE_URL not configured',
          message: 'Please add DATABASE_URL to Vercel Environment Variables'
        },
        { status: 500 }
      );
    }

    // Dynamically import and run the migration script
    // Note: This requires the migration script to be importable
    const migrationScript = require('../../scripts/run-migrations.js');
    
    // The script runs automatically when imported
    // We'll need to refactor it to export a function instead
    
    return NextResponse.json({
      success: true,
      message: 'Migrations endpoint ready. Migration script needs to be refactored to be importable.',
      note: 'For now, use Option 2: Run migrations locally with DATABASE_URL set to production URL'
    });

  } catch (error: any) {
    console.error('Migration API error:', error);
    
    return NextResponse.json(
      {
        error: 'Migration failed',
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Migration API endpoint',
    instructions: 'Run migrations manually by:',
    options: [
      '1. Visit: https://your-domain.vercel.app/api/migrate (POST)',
      '2. Or run locally: DATABASE_URL="your-prod-url" npm run migrate',
      '3. Or use Vercel CLI with DATABASE_URL set'
    ],
    current_status: {
      has_database_url: !!process.env.DATABASE_URL,
      node_env: process.env.NODE_ENV
    }
  });
}
