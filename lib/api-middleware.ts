import { NextRequest, NextResponse } from 'next/server';
import { 
  rateLimitMiddleware, 
  createRateLimitHeaders, 
  extractClientIP,
  getRateLimitType,
  applyRateLimit,
  RateLimitResult 
} from './rate-limit';

// CORS headers for public API access
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Enhanced API response helper that includes rate limiting
 */
export async function createAPIResponse<T>(
  request: NextRequest,
  data: T,
  status: number = 200,
  additionalHeaders: Record<string, string> = {}
): Promise<NextResponse<T>> {
  const pathname = new URL(request.url).pathname;
  const clientIP = extractClientIP(request);
  const rateLimitType = getRateLimitType(pathname);
  
  // Apply rate limiting
  const rateLimitResult = await applyRateLimit(clientIP, rateLimitType);
  
  // Create headers
  const headers = {
    ...corsHeaders,
    ...createRateLimitHeaders(rateLimitResult),
    ...additionalHeaders
  };

  return NextResponse.json(data, { 
    status,
    headers
  });
}

/**
 * Enhanced error response helper with rate limiting
 */
export async function createErrorResponse(
  request: NextRequest,
  error: string,
  message: string,
  status: number = 500,
  details?: any
): Promise<NextResponse> {
  const pathname = new URL(request.url).pathname;
  const clientIP = extractClientIP(request);
  const rateLimitType = getRateLimitType(pathname);
  
  // Apply rate limiting
  const rateLimitResult = await applyRateLimit(clientIP, rateLimitType);
  
  // Create error response
  const errorData = {
    error,
    message,
    ...(details && { details })
  };

  // Create headers
  const headers = {
    ...corsHeaders,
    ...createRateLimitHeaders(rateLimitResult),
    'Content-Type': 'application/json'
  };

  return NextResponse.json(errorData, { 
    status,
    headers
  });
}

/**
 * Rate limit check middleware
 * Returns rate limit response if exceeded, null if allowed
 */
export async function checkRateLimit(
  request: NextRequest,
  pathname: string
): Promise<NextResponse | null> {
  const rateLimitResponse = await rateLimitMiddleware(request, pathname);
  return rateLimitResponse?.response || null;
}

/**
 * Wrapper for API route handlers that automatically applies rate limiting
 */
export function withRateLimit<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const pathname = new URL(request.url).pathname;
    
    // Check rate limit
    const rateLimitResponse = await checkRateLimit(request, pathname);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    // Call original handler
    return handler(request, ...args);
  };
}

/**
 * Get rate limit information for debugging
 */
export async function getRateLimitInfo(request: NextRequest): Promise<{
  clientIP: string;
  rateLimitType: string;
  rateLimitResult: RateLimitResult;
}> {
  const pathname = new URL(request.url).pathname;
  const clientIP = extractClientIP(request);
  const rateLimitType = getRateLimitType(pathname);
  const rateLimitResult = await applyRateLimit(clientIP, rateLimitType);
  
  return {
    clientIP,
    rateLimitType,
    rateLimitResult
  };
}

/**
 * Handle preflight requests with rate limiting
 */
export async function handleOptions(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders
  });
}


