import { NextRequest, NextResponse } from 'next/server';
import { ComplexSystemsData } from '@/lib/complex-systems-data';
import { LorenzStudyResponse, ErrorResponse } from '@/lib/types/complex-systems';
import { createAPIResponse, createErrorResponse, handleOptions } from '@/lib/api-middleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return createErrorResponse(
        request,
        'Invalid study ID format',
        'Study ID must be a valid UUID',
        400
      );
    }

    // Get study details
    const studyResult = await ComplexSystemsData.getStudy(id);

    if (!studyResult.study) {
      return createErrorResponse(
        request,
        'Study not found',
        'No study found with the provided ID',
        404
      );
    }

    // Check if it's a Lorenz study
    if (studyResult.study.system_type !== 'lorenz') {
      return createErrorResponse(
        request,
        'Invalid study type',
        'Study is not a Lorenz attractor study',
        400
      );
    }

    // Get related data in parallel
    const [parametersResult, initialConditionsResult, metricsResult, trajectoriesResult] = await Promise.all([
      ComplexSystemsData.getParameters(id),
      ComplexSystemsData.getInitialConditions(id),
      ComplexSystemsData.getMetrics(id),
      ComplexSystemsData.getTrajectories(id)
    ]);

    const response: LorenzStudyResponse = {
      study: studyResult.study,
      parameters: parametersResult.parameters,
      initial_conditions: initialConditionsResult.conditions,
      metrics: metricsResult.metrics,
      trajectory_count: trajectoriesResult.trajectories.length
    };

    // Determine cache status (HIT if any data came from cache)
    const fromCache = studyResult.fromCache || 
                     parametersResult.fromCache || 
                     initialConditionsResult.fromCache || 
                     metricsResult.fromCache || 
                     trajectoriesResult.fromCache;

    // Add cache headers
    const additionalHeaders = {
      'X-Cache': fromCache ? 'HIT' : 'MISS',
      'Cache-Control': 'public, max-age=86400', // 24 hours
    };

    return createAPIResponse(request, response, 200, additionalHeaders);

  } catch (error) {
    console.error('Error fetching Lorenz study:', error);
    
    return createErrorResponse(
      request,
      'Failed to fetch Lorenz study',
      error instanceof Error ? error.message : 'Unknown error',
      500,
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return handleOptions(request);
}
