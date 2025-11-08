import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Use Upstash Redis in production, file storage locally
const isProduction = process.env.NODE_ENV === 'production';
const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'now.json');

// Type for Redis client
type RedisClient = {
  get: (key: string) => Promise<unknown>;
  set: (key: string, value: string) => Promise<string>;
};

const resolveEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
  }
  return null;
};

// Dynamically import Upstash Redis only in production
let redis: RedisClient | null = null;
if (isProduction) {
  try {
    const redisUrl = resolveEnv(
      'UPSTASH_REDIS_REST_URL',
      'UPSTASH__REDIS_REST_URL',
      'UPSTASH__REDIS_URL'
    );
    const redisToken = resolveEnv(
      'UPSTASH_REDIS_REST_TOKEN',
      'UPSTASH__REDIS_REST_TOKEN',
      'UPSTASH__REDIS_TOKEN'
    );

    if (!redisUrl || !redisToken) {
      console.warn('Redis environment variables not set, using memory store');
    } else {
      const { Redis } = require('@upstash/redis');
      const client = new Redis({
        url: redisUrl,
        token: redisToken,
      });
      redis = {
        get: (key: string) => client.get(key),
        set: (key: string, value: string) => client.set(key, value),
      };
      console.log('Redis connected successfully');
    }
  } catch (error) {
    console.warn('Upstash Redis not available, falling back to memory storage:', error);
  }
}

// Fallback: if Redis is not available in production, use a simple in-memory store
let memoryStore: NowDataStore | null = null;

// Type for NowEntry
interface NowEntry {
  month: string;
  lastUpdated: string;
  building?: string[];
  exploring?: string[];
  reading?: { title: string; author: string }[];
  listening?: {
    title: string;
    artist?: string;
    link?: string;
  };
  producing?: {
    title: string;
    file: string;
  }[];
  using?: string[];
  location?: string;
  openTo?: string[];
}

// Type for stored data structure
interface NowDataStore {
  currentEntry: NowEntry | null;
  history: NowEntry[];
  lastUpdated?: string;
}

// Fallback data structure (matches your current nowData)
const fallbackData = [
  {
    month: "NOVEMBER 2025",
    lastUpdated: "November 2025",
    building: ["RAG chatbot", "Portfolio site"],
    exploring: ["Rust", "TouchDesigner"],
    reading: [
      { title: "The Extended Mind", author: "Andy Clark" }
    ],
    listening: {
      title: "Radiohead - Creep",
      artist: "Radiohead",
      link: ""
    },
    producing: [],
    using: ["Cursor", "Claude", "Vercel"],
    location: "Brooklyn, NY",
    openTo: ["Freelance projects", "Collaboration"]
  },
  {
    month: "OCTOBER 2025",
    lastUpdated: "October 22, 2025",
    building: ["mileswaite.net", "Emergent Geometry", "TD - callbacks"],
    exploring: ["Python", "Next.js", "TouchDesigner: event-based triggering"],
    reading: [
      { title: "All Things Are Full of Gods", author: "David Bentley Hart" },
      { title: "Against The Day", author: "Thomas Pynchon" }
    ],
    listening: {
      title: "A Model of Reality",
      artist: "Sunnk",
      link: "https://music.amazon.co.uk/albums/B0BQCR5B27?trackAsin=B0BQCSQNWW&ref=dm_sh_3a94-44bc-60a0-a81f-ed5f5"
    },
    producing: [
      {
        title: "WIP Mix 01",
        file: "/music/theremaxmw-edit.mp3"
      },
      {
        title: "Track 2",
        file: "/music/airychant.mp3"
      },
      {
        title: "Track 3", 
        file: "/music/echobass.mp3"
      }
    ],
    using: ["Prompt Engineering", "Cursor", "Claude - Sonnet 4.5"],
    location: "London, UK",
    openTo: ["Live 12.3", "TouchDesigner"]
  }
];

// GET - Fetch Now page data
export async function GET() {
  try {
    let data = null;
    
    if (isProduction && redis) {
      // Use Upstash Redis in production
      const raw = await redis.get('now-data');
      if (typeof raw === 'string') {
        data = JSON.parse(raw);
      } else {
        data = raw;
      }
    } else if (isProduction && memoryStore) {
      // Use memory store as fallback in production
      data = memoryStore;
    } else {
      // Use file storage locally
      if (fs.existsSync(DATA_FILE)) {
        const fileData = fs.readFileSync(DATA_FILE, 'utf8');
        data = JSON.parse(fileData);
      }
    }
    
    if (data) {
      // Handle new structure with currentEntry
      if (data.currentEntry) {
        // Return array format for backward compatibility
        const currentEntry = data.currentEntry;
        const history = data.history || [];
        return NextResponse.json([currentEntry, ...history]);
      }
      
      // Handle old array format
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data);
      }
    }
    
    // Fallback to hardcoded data
    return NextResponse.json(fallbackData);
  } catch (error) {
    console.error('Error reading Now data:', error);
    return NextResponse.json(fallbackData);
  }
}

// POST - Save new Now page update
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.month || !body.lastUpdated) {
      return NextResponse.json(
        { error: 'Missing required fields: month, lastUpdated' },
        { status: 400 }
      );
    }

    // Read existing data
    let existingData: NowDataStore = { currentEntry: null, history: [] };
    let storedData: unknown = null;
    
    if (isProduction && redis) {
      // Use Upstash Redis in production
      const raw = await redis.get('now-data');
      if (typeof raw === 'string') {
        storedData = JSON.parse(raw);
      } else {
        storedData = raw;
      }
    } else if (isProduction && memoryStore) {
      // Use memory store as fallback in production
      storedData = memoryStore;
    } else {
      // Use file storage locally
      if (fs.existsSync(DATA_FILE)) {
        const fileData = fs.readFileSync(DATA_FILE, 'utf8');
        storedData = JSON.parse(fileData);
      }
    }
    
    if (storedData) {
      // Handle new structure with currentEntry
      if (typeof storedData === 'object' && storedData !== null && 'currentEntry' in storedData) {
        existingData = storedData as NowDataStore;
      } else if (Array.isArray(storedData)) {
        // Convert old array format to new structure
        existingData = {
          currentEntry: (storedData[0] as NowEntry) || null,
          history: (storedData.slice(1) as NowEntry[]) || []
        };
      }
    }

    // Move current entry to history and set new entry as current
    const updatedData = {
      currentEntry: body,
      history: existingData.currentEntry 
        ? [existingData.currentEntry, ...existingData.history] 
        : existingData.history,
      lastUpdated: new Date().toISOString()
    };

    // Store data
    if (isProduction && redis) {
      try {
        // Store in Upstash Redis
        await redis.set('now-data', JSON.stringify(updatedData));
        console.log('Data stored in Redis successfully');
      } catch (redisError) {
        console.warn('Redis storage failed, using memory store:', redisError);
        memoryStore = updatedData as NowDataStore;
      }
    } else if (isProduction) {
      // Store in memory as fallback in production
      memoryStore = updatedData as NowDataStore;
      console.log('Data stored in memory store');
    } else {
      // Store in file locally
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2));
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Now page updated successfully',
      data: updatedData 
    });

  } catch (error) {
    console.error('Error saving Now data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save data',
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
