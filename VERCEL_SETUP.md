# Vercel Stats Setup

To enable Vercel deployment stats in your ticker, you need to add the following environment variables:

## Required Environment Variables

### 1. Get Your Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Give it a name (e.g., "Portfolio Stats")
4. Copy the token

### 2. Get Your Vercel Project ID

1. Go to your Vercel project dashboard
2. Go to Settings
3. Copy your Project ID from the General tab

### 3. Add to Environment Variables

Add these to your `.env.local` file (create it if it doesn't exist):

```bash
# Vercel Stats
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=your_project_id_here
```

### 4. Add to Vercel Dashboard

For production, also add these to your Vercel project:

1. Go to your Vercel project → Settings → Environment Variables
2. Add `VERCEL_TOKEN` with your token value
3. Add `VERCEL_PROJECT_ID` with your project ID
4. Redeploy your project

## What Stats Will Show

Once configured, your ticker will display:
- **Total deployments** (last 20)
- **Success rate** (percentage of successful deployments)

These will appear between "projects indexed" and the other stats in your ticker.

## Testing Locally

After adding the environment variables:
1. Restart your dev server (`npm run dev`)
2. Wait for the ticker to refresh
3. You should see deployment stats appear

## Troubleshooting

If stats don't appear:
- Check your token has the correct permissions
- Verify your project ID is correct
- Check the browser console for any errors
- Look at the server logs for "Vercel deployment stats fetched"

