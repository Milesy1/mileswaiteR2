# Stats Ticker Environment Variables Checklist

## Required Environment Variables for Stats Ticker

### ✅ What Each Variable Does:

1. **`GITHUB_TOKEN`** 
   - Source: GitHub API
   - Shows: Stars, Repositories, Followers
   - Status: ❓ Check in Vercel
   - How to get: https://github.com/settings/tokens (scope: `public_repo`)

2. **`VERCEL_TOKEN`**
   - Source: Vercel API
   - Shows: Total Deployments, Success Rate
   - Status: ❓ Check in Vercel
   - How to get: https://vercel.com/account/tokens

3. **`VERCEL_PROJECT_ID`** or **`NEXT_PUBLIC_VERCEL_PROJECT_ID`**
   - Source: Vercel API
   - Shows: Deployment stats
   - Status: ❓ Check in Vercel
   - How to get: Vercel project settings → General → Project ID

4. **`GA_PROPERTY_ID`**
   - Source: Google Analytics API
   - Shows: Pageviews, Active Visitors, Bounce Rate, Session Duration
   - Status: ❓ Check in Vercel
   - Expected value: `490870293` (from GA_SERVICE_ACCOUNT_SETUP.md)

5. **`GA_CREDENTIALS`**
   - Source: Google Analytics API
   - Shows: Analytics data
   - Status: ❓ Check in Vercel
   - Format: JSON string (entire service account credentials)

6. **`AXIOM_TOKEN`** (Optional)
   - Source: Axiom API
   - Shows: Chatbot Conversations, Response Time
   - Status: ❓ Check in Vercel

7. **`AXIOM_DATASET`** (Optional)
   - Source: Axiom API
   - Shows: Chatbot stats
   - Status: ❓ Check in Vercel

## How to Check Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select your project: `mileswaiteR2` (or your project name)
3. Click **Settings** → **Environment Variables**
4. Check which variables are listed there

## Current Behavior

- ✅ **If variable is set**: Shows REAL data from API
- ❌ **If variable is NOT set**: Shows `0` (not fake data)

## What Shows Without Configuration

- Pageviews: `0` (if GA not configured)
- Active Now: `0` (if GA not configured)
- GitHub Stars: `0` (if GITHUB_TOKEN not configured)
- Deployments: `0` (if VERCEL_TOKEN not configured)
- Projects Indexed: `47` (hardcoded - always shows)
- Accuracy: `89%` (hardcoded - always shows)

## Quick Test

Visit your live site: https://mileswaite.net/about

Look at the stats ticker. If you see:
- Non-zero numbers → Those APIs are configured ✅
- Zeros → Those APIs need configuration ❌

