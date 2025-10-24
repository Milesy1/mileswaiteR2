import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Fallback data structure (matches your current nowData)
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

const dataFilePath = path.join(process.cwd(), 'public', 'data', 'now.json');

// GET - Fetch Now page data
export async function GET() {
  try {
    // Try to read from JSON file
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      const data = JSON.parse(fileData);
      return NextResponse.json(data);
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

    // Ensure data directory exists
    const dataDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing data or use fallback
    let existingData = fallbackData;
    if (fs.existsSync(dataFilePath)) {
      try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        existingData = JSON.parse(fileData);
      } catch (error) {
        console.error('Error reading existing data, using fallback:', error);
      }
    }

    // Add new entry to beginning of array (most recent first)
    // Keep all entries - allow multiple updates per month
    const newData = [body, ...existingData];

    // Save to file
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'Now page updated successfully',
      data: newData 
    });

  } catch (error) {
    console.error('Error saving Now data:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
