import { NextRequest, NextResponse } from 'next/server';
import { ComplexSystemsData } from '@/lib/complex-systems-data';
import { MetricsResponse, ErrorResponse } from '@/lib/types/complex-systems';
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

    // Validate study exists and is Lorenz type
    const studyResult = await ComplexSystemsData.getStudy(id);
    if (!studyResult.study) {
      return createErrorResponse(
        request,
        'Study not found',
        'No study found with the provided ID',
        404
      );
    }

    if (studyResult.study.system_type !== 'lorenz') {
      return createErrorResponse(
        request,
        'Invalid study type',
        'Study is not a Lorenz attractor study',
        400
      );
    }

    // Get chaos metrics
    const metricsResult = await ComplexSystemsData.getMetrics(id);

    const response: MetricsResponse = {
      study_id: id,
      metrics: metricsResult.metrics,
      total_metrics: metricsResult.metrics.length
    };

    // Add cache headers
    const additionalHeaders = {
      'X-Cache': metricsResult.fromCache ? 'HIT' : 'MISS',
      'Cache-Control': 'public, max-age=86400', // 24 hours
    };

    return createAPIResponse(request, response, 200, additionalHeaders);

  } catch (error) {
    console.error('Error fetching chaos metrics:', error);
    
    return createErrorResponse(
      request,
      'Failed to fetch chaos metrics',
      error instanceof Error ? error.message : 'Unknown error',
      500,
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}

export async function OPTIONS() {
  return handleOptions();
}