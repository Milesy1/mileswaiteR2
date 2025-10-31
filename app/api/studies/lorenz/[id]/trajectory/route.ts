import { NextRequest, NextResponse } from 'next/server';
import { ComplexSystemsData } from '@/lib/complex-systems-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not set, returning empty trajectory data');
      return NextResponse.json({
        study_id: '',
        points: [],
        total_points: 0,
        sampled: false,
        message: 'Database not configured'
      }, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60'
        }
      });
    }

    const { id } = await params;
    console.log('=== TRAJECTORY ROUTE CALLED ===');
    console.log('Study ID:', id);
    console.log('Request URL:', request.url);
    console.log('Request method:', request.method);
    
    const { searchParams } = new URL(request.url);
    const sample = searchParams.get('sample') ? parseInt(searchParams.get('sample')!) : undefined;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: 'Invalid study ID format', message: 'Study ID must be a valid UUID' },
        { status: 400 }
      );
    }

    // Validate study exists and is Lorenz type
    let studyResult;
    try {
      studyResult = await ComplexSystemsData.getStudy(id);
    } catch (dbError) {
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
      console.error('Database error when fetching study:', errorMessage);
      
      // If database connection error, return empty data gracefully
      if (errorMessage.includes('DATABASE_URL') || errorMessage.includes('connection')) {
        return NextResponse.json({
          study_id: id,
          points: [],
          total_points: 0,
          sampled: false,
          message: 'Database unavailable'
        }, {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=60'
          }
        });
      }
      throw dbError; // Re-throw if it's not a connection error
    }

    console.log('Study lookup result:', { id, found: !!studyResult.study, study: studyResult.study });
    
    if (!studyResult.study) {
      console.log('Study not found! ID:', id);
      console.log('Study result:', studyResult);
      return NextResponse.json(
        { error: 'Study not found', message: `No study found with the provided ID: ${id}` },
        { status: 404 }
      );
    }
    
    console.log('Study found:', {
      id: studyResult.study.id,
      name: studyResult.study.name,
      system_type: studyResult.study.system_type
    });

    if (studyResult.study.system_type !== 'lorenz') {
      return NextResponse.json(
        { error: 'Invalid study type', message: 'Study is not a Lorenz attractor study' },
        { status: 400 }
      );
    }

    // Get trajectory data
    console.log('Fetching trajectories for study:', id);
    let trajectoriesResult;
    let totalTrajectoriesResult;
    
    try {
      trajectoriesResult = await ComplexSystemsData.getTrajectories(id, sample);
      totalTrajectoriesResult = await ComplexSystemsData.getTrajectories(id); // Get full count
    } catch (trajError) {
      const errorMessage = trajError instanceof Error ? trajError.message : 'Unknown error';
      console.error('Error fetching trajectories:', errorMessage);
      
      // If database error, return empty data gracefully
      if (errorMessage.includes('DATABASE_URL') || errorMessage.includes('connection')) {
        return NextResponse.json({
          study_id: id,
          points: [],
          total_points: 0,
          sampled: sample !== undefined,
          sample_size: sample,
          message: 'Database unavailable'
        }, {
          status: 200,
          headers: {
            'Cache-Control': 'public, max-age=60'
          }
        });
      }
      throw trajError; // Re-throw if it's not a connection error
    }
    
    console.log('Trajectories fetched:', {
      sampledCount: trajectoriesResult.data.trajectories.length,
      totalCount: totalTrajectoriesResult.data.trajectories.length
    });

    const response = {
      study_id: id,
      points: trajectoriesResult.data.trajectories,
      total_points: totalTrajectoriesResult.data.trajectories.length,
      sampled: sample !== undefined,
      sample_size: sample
    };
    
    console.log('Returning response with', response.points.length, 'points');

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': trajectoriesResult.fromCache ? 'HIT' : 'MISS',
      }
    });

  } catch (error) {
    console.error('Error fetching trajectory data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Check if it's a database connection error
    const isDatabaseError = errorMessage.includes('DATABASE_URL') || 
                           errorMessage.includes('connection') ||
                           errorMessage.includes('Database connection');
    
    if (isDatabaseError) {
      console.warn('Database unavailable, returning empty trajectory data');
      return NextResponse.json({
        study_id: '',
        points: [],
        total_points: 0,
        sampled: false,
        message: 'Database unavailable'
      }, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=60'
        }
      });
    }
    
    // For other errors, return proper error response
    return NextResponse.json(
      {
        error: 'Failed to fetch trajectory data',
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { 
          details: errorStack,
          errorType: error instanceof Error ? error.constructor.name : typeof error
        })
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
