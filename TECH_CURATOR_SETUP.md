# Tech Stack Curator Setup Guide

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```bash
# Groq API Key (required for content curation)
GROQ_API_KEY=your_groq_api_key_here

# GitHub Token (optional, for GitHub API access)
GITHUB_TOKEN=your_github_token_here

# Cron Secret (for securing the cron endpoint)
CRON_SECRET=your_random_secret_string_here
```

## Getting API Keys

### 1. Groq API Key
- Visit: https://console.groq.com/
- Sign up/login
- Go to API Keys section
- Create a new API key
- Copy the key (starts with `gsk_`)

### 2. GitHub Token (Optional)
- Visit: https://github.com/settings/tokens
- Generate new token (classic)
- Select scope: `public_repo` (for public repository access)
- Copy the token (starts with `ghp_`)

### 3. Cron Secret
Generate a random secret string:
```bash
# On Windows (PowerShell):
[System.Web.Security.Membership]::GeneratePassword(32, 0)

# On Mac/Linux:
openssl rand -base64 32
```

## Testing the System

### 1. Local Testing
```bash
# Start development server
npm run dev

# Test manual curation (in another terminal)
curl -X POST http://localhost:3000/api/curator/manual
```

### 2. Check Results
- Visit: http://localhost:3000/now
- Look for the "LEARNING" section
- Should show curated tech articles

## Deployment to Vercel

### 1. Add Environment Variables
In Vercel dashboard:
- Go to your project settings
- Navigate to Environment Variables
- Add all three variables from `.env.local`

### 2. Deploy
```bash
git add .
git commit -m "Add tech stack curator system"
git push origin main
```

### 3. Verify Cron Job
- Check Vercel Functions tab
- Look for cron job logs
- First run: Next Monday at 9am UTC

## System Features

✅ **Automated Weekly Updates**: Runs every Monday at 9am UTC
✅ **Multi-Source Content**: Fetches from Hacker News, GitHub, Dev.to, Reddit
✅ **AI Curation**: Uses Groq to filter and rank content
✅ **Tech Stack Focused**: Curates content for Next.js, React, TypeScript, AI, TouchDesigner
✅ **Quality Filtering**: Only shows advanced, high-quality content
✅ **Zero Maintenance**: Fully automated system

## Troubleshooting

### No Learning Section Appears
1. Check environment variables are set
2. Verify Groq API key is valid
3. Check browser console for errors
4. Test manual endpoint: `POST /api/curator/manual`

### Cron Job Not Running
1. Verify `vercel.json` is deployed
2. Check Vercel Functions logs
3. Ensure `CRON_SECRET` is set in Vercel

### API Errors
1. Check network connectivity
2. Verify API rate limits
3. Check console logs in Vercel Functions

## File Structure

```
├── lib/
│   ├── techStack.ts          # Tech definitions & keywords
│   ├── contentSources.ts     # API integrations
│   └── curator.ts           # Groq curation logic
├── app/api/curator/
│   ├── cron/route.ts        # Automated weekly runs
│   └── manual/route.ts      # Manual testing
├── public/data/
│   └── now.json            # Updated with learning section
├── app/now/
│   └── page.tsx            # Displays learning section
└── vercel.json             # Cron configuration
```

## Success Criteria

The system is working when:
- ✅ Runs automatically every Monday
- ✅ Fetches from 4+ sources per tech
- ✅ Groq curates quality content
- ✅ Updates now.json with 3-5 items
- ✅ Now page displays correctly
- ✅ Links open in new tabs
- ✅ Mobile-friendly
- ✅ No errors in production
