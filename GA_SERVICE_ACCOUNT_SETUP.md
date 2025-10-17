# Google Analytics Service Account Setup

## ✅ What We've Completed:

1. ✅ Added Google Analytics tracking code to your website (Measurement ID: `G-4B9899H34T`)
2. ✅ Created `.env.local` with your GA Property ID: `490870293`
3. ✅ Service account credentials are in `ga-credentials.json`

## 🔧 IMPORTANT: Grant Service Account Access

Your service account needs permission to read your Google Analytics data. Follow these steps:

### Step 1: Add Service Account to Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. In the **Property** column, click **Property Access Management**
4. Click the **+** button (top right)
5. Click **Add users**
6. Enter this email: `mileswaite-analytics-ticker@exalted-cell-475019-b7.iam.gserviceaccount.com`
7. Select role: **Viewer** (or **Analyst** for more access)
8. Uncheck "Notify new users by email"
9. Click **Add**

### Step 2: Wait for Data Collection

- **Real-time data**: Shows within 1-5 minutes after visitors arrive
- **Historical data**: Takes 24-48 hours to populate
- Your ticker will start showing real numbers once data is collected

## 🧪 Test Your Setup:

### Test 1: Check Google Analytics Real-Time Report
1. Visit your live website: `https://mileswaite.net`
2. Open Google Analytics
3. Go to **Reports** → **Real-time**
4. You should see yourself as an active user within 1-2 minutes

### Test 2: Check Your Ticker
1. Visit your website
2. Look at the ticker at the bottom
3. Initially it will show 0s (no data yet)
4. After 24-48 hours, it will show real pageview data

## 🚀 For Vercel/Production Deployment:

Add these environment variables in Vercel:
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `GA_PROPERTY_ID` = `490870293`
   - `GA_CREDENTIALS` = (paste the entire contents of `ga-credentials.json` as a single line)

## 📊 Current Status:

- ✅ Google Analytics tracking code: **ACTIVE**
- ⏳ Data collection: **Started (needs 24-48 hours for history)**
- ⚠️ Service account access: **Needs to be granted** (see Step 1 above)
- ✅ Stats API endpoint: **Working** at `/api/stats`

## 🔍 Verify It's Working:

After you grant service account access and data is collected:

```bash
# Check if stats API returns real data
curl http://localhost:3000/api/stats
```

You should see `dataSource: "axiom-and-vercel"` or actual numbers instead of all zeros.

