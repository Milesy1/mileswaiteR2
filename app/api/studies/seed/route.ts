import { NextRequest, NextResponse } from 'next/server';
import { ComplexSystemsData } from '@/lib/complex-systems-data';
import { createAPIResponse, createErrorResponse, handleOptions } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  try {
    // Check for authorization (optional - you might want to add a secret key)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = process.env.SEED_AUTH_TOKEN;
    
    if (expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
      return createErrorResponse(
        request,
        'Unauthorized',
        'Invalid or missing authorization token',
        401
      );
    }

    // Seed sample data
    await ComplexSystemsData.seedSampleData();

    const response = { 
      success: true, 
      message: 'Sample data seeded successfully',
      timestamp: new Date().toISOString()
    };

    return createAPIResponse(request, response, 200);

  } catch (error) {
    console.error('Error seeding data:', error);
    
    return createErrorResponse(
      request,
      'Failed to seed data',
      error instanceof Error ? error.message : 'Unknown error',
      500,
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}

export async function OPTIONS() {
  return handleOptions();
}
