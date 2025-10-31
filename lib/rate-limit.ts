import { redis } from './redis';

// Rate limit configuration
export const RATE_LIMITS = {
  // List endpoints (studies listing)
  LIST: { limit: 100, window: 3600 }, // 100 requests per hour
  
  // Detail endpoints (study details, parameters, etc.)
  DETAIL: { limit: 100, window: 3600 }, // 100 requests per hour
  
  // Heavy data endpoints (full trajectories, bifurcation data)
  HEAVY: { limit: 50, window: 3600 }, // 50 requests per hour
  
  // Metrics and constants (computed data)
  METRICS: { limit: 100, window: 3600 }, // 100 requests per hour
} as const;

export type RateLimitType = keyof typeof RATE_LIMITS;

// Rate limit result interface
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

// Rate limit error class
export class RateLimitError extends Error {
  constructor(
    public limit: number,
    public remaining: number,
    public reset: number,
    public retryAfter: number
  ) {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
  }
}

/**
 * Implements sliding window rate limiting using Redis sorted sets
 * 
 * Algorithm:
 * 1. Remove all entries older than the current window
 * 2. Count current entries in the window
 * 3. If under limit, add new entry and allow request
 * 4. If over limit, deny request
 * 
 * @param identifier - Unique identifier (usually IP address)
 * @param limit - Maximum requests allowed in window
 * @param window - Time window in seconds
 * @returns RateLimitResult with success status and metadata
 */
export async function rateLimit(
  identifier: string,
  limit: number,
  window: number
): Promise<RateLimitResult> {
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const windowStart = now - (window * 1000);

  try {
    // Use Redis pipeline for atomic operations
    const pipeline = redis.pipeline();
    
    // Remove old entries outside the window
    (pipeline as any).zremrangebyscore(key, '-inf', windowStart.toString());
    
    // Count current entries in the window
    pipeline.zcard(key);
    
    // Add current request timestamp
    pipeline.zadd(key, { score: now, member: now.toString() });
    
    // Set expiration for the key (cleanup)
    pipeline.expire(key, window);
    
    // Execute pipeline
    const results = await pipeline.exec();
    
    // Extract count from pipeline results (handle mock client)
    const currentCount = results && results[1] ? results[1] as number : 0;
    
    // Check if we're under the limit
    if (currentCount < limit) {
      return {
        success: true,
        limit,
        remaining: limit - currentCount - 1, // -1 for the request we just added
        reset: now + (window * 1000)
      };
    } else {
      // Rate limit exceeded
      const oldestEntry = await redis.zrange(key, 0, 0, { withScores: true }) as Array<{ value: string; score: number }>;
      const oldestTimestamp = oldestEntry.length > 0 ? oldestEntry[0].score : now;
      const retryAfter = Math.ceil((oldestTimestamp + (window * 1000) - now) / 1000);
      
      return {
        success: false,
        limit,
        remaining: 0,
        reset: oldestTimestamp + (window * 1000),
        retryAfter: Math.max(0, retryAfter)
      };
    }
  } catch (error) {
    // On Redis error, log but allow request through
    console.error('Rate limiting Redis error:', error);
    
    // Return success to allow request through
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + (window * 1000)
    };
  }
}

/**
 * Get rate limit configuration for different endpoint types
 */
export function getRateLimitConfig(type: RateLimitType) {
  return RATE_LIMITS[type];
}

/**
 * Apply rate limiting with automatic configuration based on endpoint type
 */
export async function applyRateLimit(
  identifier: string,
  type: RateLimitType
): Promise<RateLimitResult> {
  const config = getRateLimitConfig(type);
  return rateLimit(identifier, config.limit, config.window);
}

/**
 * Extract client IP from request headers
 * Handles various proxy headers and IPv6 addresses
 */
export function extractClientIP(request: Request): string {
  // Check various headers for client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  const xClientIP = request.headers.get('x-client-ip');
  
  // Get IP from forwarded-for header (first IP in comma-separated list)
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return ips[0];
  }
  
  // Check other headers
  if (realIP) return realIP;
  if (cfConnectingIP) return cfConnectingIP;
  if (xClientIP) return xClientIP;
  
  // Fallback to a default identifier for localhost/development
  return 'localhost';
}

/**
 * Create rate limit headers for HTTP response
 */
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
  };
  
  if (result.retryAfter !== undefined) {
    headers['Retry-After'] = result.retryAfter.toString();
  }
  
  return headers;
}

/**
 * Determine rate limit type based on API endpoint path
 */
export function getRateLimitType(pathname: string): RateLimitType {
  // Heavy data endpoints (full trajectories, bifurcation data)
  if (pathname.includes('/trajectory') || pathname.includes('/bifurcation')) {
    return 'HEAVY';
  }
  
  // Metrics and constants endpoints
  if (pathname.includes('/metrics') || pathname.includes('/feigenbaum')) {
    return 'METRICS';
  }
  
  // List endpoints (studies listing)
  if (pathname.endsWith('/chaos') || pathname.endsWith('/studies')) {
    return 'LIST';
  }
  
  // Default to detail endpoints
  return 'DETAIL';
}

/**
 * Rate limit middleware for Next.js API routes
 * Returns response if rate limited, null if allowed to proceed
 */
export async function rateLimitMiddleware(
  request: Request,
  pathname: string
): Promise<{ response: Response } | null> {
  try {
    const clientIP = extractClientIP(request);
    const rateLimitType = getRateLimitType(pathname);
    
    const result = await applyRateLimit(clientIP, rateLimitType);
    
    if (!result.success) {
      // Rate limit exceeded
      const headers = createRateLimitHeaders(result);
      
      return {
        response: new Response(
          JSON.stringify({
            error: 'Rate limit exceeded',
            message: `Too many requests. Limit: ${result.limit} per hour. Try again in ${result.retryAfter} seconds.`,
            limit: result.limit,
            remaining: result.remaining,
            reset: result.reset,
            retryAfter: result.retryAfter
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              ...headers
            }
          }
        )
      };
    }
    
    // Rate limit passed, return null to allow request to proceed
    return null;
  } catch (error) {
    // On any error, allow request through but log the error
    console.error('Rate limit middleware error:', error);
    return null;
  }
}

/**
 * Get current rate limit status for an identifier
 * Useful for debugging or status endpoints
 */
export async function getRateLimitStatus(
  identifier: string,
  type: RateLimitType
): Promise<{
  current: number;
  limit: number;
  remaining: number;
  reset: number;
  window: number;
}> {
  const config = getRateLimitConfig(type);
  const key = `ratelimit:${identifier}`;
  const now = Date.now();
  const windowStart = now - (config.window * 1000);
  
  try {
    // Remove old entries and get current count
    await (redis as any).zremrangebyscore(key, '-inf', windowStart.toString());
    const current = await redis.zcard(key);
    
    return {
      current,
      limit: config.limit,
      remaining: Math.max(0, config.limit - current),
      reset: now + (config.window * 1000),
      window: config.window
    };
  } catch (error) {
    console.error('Error getting rate limit status:', error);
    return {
      current: 0,
      limit: config.limit,
      remaining: config.limit,
      reset: now + (config.window * 1000),
      window: config.window
    };
  }
}
