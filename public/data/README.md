# Now Page Data Directory

This directory contains the dynamic data for the Now page admin system.

## Files

- `now.json` - Contains the Now page entries in JSON format
- `README.md` - This file

## Data Structure

The `now.json` file contains an array of Now page entries, with the most recent entry first:

```json
[
  {
    "month": "NOVEMBER 2025",
    "lastUpdated": "November 15, 2025",
    "building": ["Project 1", "Project 2"],
    "exploring": ["Technology 1", "Technology 2"],
    "reading": [
      { "title": "Book Title", "author": "Author Name" }
    ],
    "listening": {
      "title": "Track Title",
      "artist": "Artist Name",
      "link": "https://music.amazon.co.uk/..."
    },
    "producing": [
      {
        "title": "Track Title",
        "file": "/music/track.mp3"
      }
    ],
    "using": ["Tool 1", "Tool 2"],
    "location": "City, Country",
    "openTo": ["Opportunity 1", "Opportunity 2"]
  }
]
```

## Admin Access

- **URL**: `/admin/now`
- **Password**: `milesadmin2025` (change this in production!)

## Features

- ✅ Mobile-optimized admin interface
- ✅ Auto-save to localStorage
- ✅ Pre-fill with latest data
- ✅ Smart persistence (only change what's new)
- ✅ Fallback to hardcoded data if API fails
- ✅ Password protection
- ✅ Real-time form validation

## Usage

1. Visit `/admin/now`
2. Enter password
3. Form pre-fills with latest data
4. Modify only what's changed
5. Click "Update Now Page"
6. Changes appear on `/now` page immediately

## Backup

The system automatically falls back to the hardcoded `nowData` in `app/now/page.tsx` if:
- The JSON file doesn't exist
- The API fails
- There's a parsing error

This ensures the Now page always works, even if the admin system has issues.
