import { NextRequest, NextResponse } from 'next/server';
import { ComplexSystemsData } from '@/lib/complex-systems-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
    const studyResult = await ComplexSystemsData.getStudy(id);
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
    const trajectoriesResult = await ComplexSystemsData.getTrajectories(id, sample);
    const totalTrajectoriesResult = await ComplexSystemsData.getTrajectories(id); // Get full count
    
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
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
      console.error('Error name:', error.name);
    }
    
    return NextResponse.json(
      {
        error: 'Failed to fetch trajectory data',
        message: error instanceof Error ? error.message : 'Unknown error',
        ...(process.env.NODE_ENV === 'development' && { 
          details: error instanceof Error ? error.stack : String(error),
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
