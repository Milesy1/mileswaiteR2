import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Use Upstash Redis in production, file storage locally
const isProduction = process.env.NODE_ENV === 'production';
const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'now.json');

// Dynamically import Upstash Redis only in production
let redis: any = null;
if (isProduction) {
  try {
    const { Redis } = require('@upstash/redis');
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (error) {
    console.warn('Upstash Redis not available, falling back to file storage');
  }
}

// Fallback data structure
const fallbackData = [
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

// GET - Fetch latest Now page entry for pre-filling admin form
export async function GET() {
  try {
    let data = null;
    
    if (isProduction && redis) {
      // Use Upstash Redis in production
      data = await redis.get('now-data');
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
        return NextResponse.json(data.currentEntry);
      }
      
      // Handle old array format
      if (Array.isArray(data) && data.length > 0) {
        return NextResponse.json(data[0]); // Return first (most recent) entry
      }
    }
    
    // Fallback to hardcoded data
    return NextResponse.json(fallbackData[0]);
  } catch (error) {
    console.error('Error reading latest Now data:', error);
    return NextResponse.json(fallbackData[0]);
  }
}
