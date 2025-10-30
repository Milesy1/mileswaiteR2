import { Redis } from '@upstash/redis';

// Initialize Redis client with fallback handling
let redis: Redis;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    console.log('Redis client initialized successfully');
  } else {
    console.warn('Redis environment variables not set, using memory store fallback');
    // Create a mock Redis client for development
    redis = {
      get: async () => null,
      set: async () => 'OK',
      setex: async () => 'OK',
      del: async () => 0,
      exists: async () => 0,
      pipeline: () => ({
        zremrangebyscore: () => ({ exec: async () => [null] }),
        zcard: () => ({ exec: async () => [null] }),
        zadd: () => ({ exec: async () => [null] }),
        expire: () => ({ exec: async () => [null] }),
        exec: async () => [null, null, null, null],
      }),
    } as any;
  }
} catch (error) {
  console.error('Failed to initialize Redis client:', error);
  // Fallback to mock client
  redis = {
    get: async () => null,
    set: async () => 'OK',
    setex: async () => 'OK',
    del: async () => 0,
    exists: async () => 0,
    pipeline: () => ({
      zremrangebyscore: () => ({ exec: async () => [null] }),
      zcard: () => ({ exec: async () => [null] }),
      zadd: () => ({ exec: async () => [null] }),
      expire: () => ({ exec: async () => [null] }),
      exec: async () => [null, null, null, null],
    }),
  } as any;
}

export { redis };

// Cache configuration
export const CACHE_TTL = {
  STUDIES: 24 * 60 * 60, // 24 hours
  STUDY_DETAILS: 24 * 60 * 60, // 24 hours
  TRAJECTORY: 60 * 60, // 1 hour
  METRICS: 24 * 60 * 60, // 24 hours
  BIFURCATION: 60 * 60, // 1 hour
  CONSTANTS: 24 * 60 * 60, // 24 hours
} as const;

// Cache key generators
export const CACHE_KEYS = {
  STUDIES: (systemType?: string) => 
    systemType ? `studies:chaos:${systemType}` : 'studies:chaos',
  LORENZ_STUDY: (id: string) => `study:lorenz:${id}`,
  LORENZ_TRAJECTORY: (id: string, sample?: number) => 
    `study:lorenz:${id}:trajectory:${sample || 'all'}`,
  LORENZ_METRICS: (id: string) => `study:lorenz:${id}:metrics`,
  LOGISTIC_STUDY: (id: string) => `study:logistic:${id}`,
  LOGISTIC_BIFURCATION: (id: string, rMin?: number, rMax?: number) => 
    `study:logistic:${id}:bifurcation:${rMin || 'all'}:${rMax || 'all'}`,
  LOGISTIC_FEIGENBAUM: (id: string) => `study:logistic:${id}:feigenbaum`,
} as const;

// Generic cache helper function
export async function getCachedOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number
): Promise<{ data: T; fromCache: boolean }> {
  try {
    // Try to get from cache first
    const cached = await redis.get<T>(key);
    
    if (cached !== null) {
      return { data: cached, fromCache: true };
    }

    // Cache miss - fetch from source
    const data = await fetcher();
    
    // Store in cache with TTL
    await redis.setex(key, ttl, data);
    
    return { data, fromCache: false };
  } catch (error) {
    console.error(`Redis cache error for key ${key}:`, error);
    
    // On Redis failure, fallback to direct fetch
    const data = await fetcher();
    return { data, fromCache: false };
  }
}

// Batch cache operations
export async function getCachedOrFetchBatch<T>(
  keys: string[],
  fetcher: (missingKeys: string[]) => Promise<Record<string, T>>,
  ttl: number
): Promise<{ data: Record<string, T>; fromCache: boolean }> {
  try {
    const results: Record<string, T> = {};
    const missingKeys: string[] = [];
    
    // Check cache for all keys
    for (const key of keys) {
      const cached = await redis.get<T>(key);
      if (cached !== null) {
        results[key] = cached;
      } else {
        missingKeys.push(key);
      }
    }

    // If all keys were cached, return immediately
    if (missingKeys.length === 0) {
      return { data: results, fromCache: true };
    }

    // Fetch missing data
    const fetchedData = await fetcher(missingKeys);
    
    // Store fetched data in cache
    const pipeline = redis.pipeline();
    for (const [key, value] of Object.entries(fetchedData)) {
      pipeline.setex(key, ttl, value);
    }
    await pipeline.exec();

    // Combine cached and fetched data
    const allData = { ...results, ...fetchedData };
    
    return { data: allData, fromCache: false };
  } catch (error) {
    console.error('Redis batch cache error:', error);
    
    // On Redis failure, fallback to direct fetch
    const data = await fetcher(keys);
    return { data, fromCache: false };
  }
}

// Cache invalidation helpers
export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error(`Cache invalidation error for pattern ${pattern}:`, error);
  }
}

export async function invalidateStudyCache(studyId: string): Promise<void> {
  const patterns = [
    `study:lorenz:${studyId}*`,
    `study:logistic:${studyId}*`,
  ];
  
  await Promise.all(patterns.map(pattern => invalidateCache(pattern)));
}

// Health check
export async function checkRedisHealth(): Promise<boolean> {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error('Redis health check failed:', error);
    return false;
  }
}

// Cache statistics
export async function getCacheStats(): Promise<{
  isHealthy: boolean;
  memoryUsage?: string;
  keyCount?: number;
}> {
  try {
    const isHealthy = await checkRedisHealth();
    
    if (!isHealthy) {
      return { isHealthy: false };
    }

    // Get memory usage and key count
    const info = await redis.info('memory');
    const keyCount = await redis.dbsize();
    
    return {
      isHealthy: true,
      memoryUsage: info,
      keyCount,
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return { isHealthy: false };
  }
}
