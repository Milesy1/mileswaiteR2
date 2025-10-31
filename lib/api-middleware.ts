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
// Restrict to your domain for security
const getAllowedOrigin = (request: NextRequest): string => {
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://mileswaite.net',
    'https://www.mileswaite.net',
    'http://localhost:3000',
    'http://localhost:3001',
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    return origin;
  }
  
  // Default to your production domain
  return 'https://mileswaite.net';
};

export const getCorsHeaders = (request: NextRequest) => ({
  'Access-Control-Allow-Origin': getAllowedOrigin(request),
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
});

// Legacy export for backwards compatibility (deprecated - use getCorsHeaders)
export const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://mileswaite.net',
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
    ...getCorsHeaders(request),
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
    ...getCorsHeaders(request),
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
  if (!rateLimitResponse?.response) return null;
  
  // Convert Response to NextResponse
  const responseBody = await rateLimitResponse.response.json();
  return NextResponse.json(responseBody, { status: 429 });
}

/**
 * Wrapper for API route handlers that automatically applies rate limiting
 */
export function withRateLimit<T extends unknown[]>(
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
export async function handleOptions(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(request)
  });
}




