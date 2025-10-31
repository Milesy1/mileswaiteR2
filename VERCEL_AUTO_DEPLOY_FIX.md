# Fix: Enable Automatic Deployments on Vercel

## Why Deployments Aren't Automatic

Vercel needs to be connected to your GitHub repository to auto-deploy on push.

## Check & Fix:

### Step 1: Verify GitHub Integration

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Git**
3. Check:
   - **Repository:** Should show `Milesy1/mileswaiteR2`
   - **Production Branch:** Should be `main`
   - **Auto-deploy:** Should be **enabled**

### Step 2: If Not Connected

1. Click **"Connect Git Repository"** or **"Change Git Repository"**
2. Select **GitHub**
3. Find and select: `Milesy1/mileswaiteR2`
4. Click **"Connect"**
5. Configure:
   - **Root Directory:** `./` (default)
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm run build` (or leave default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)
6. Click **"Deploy"**

### Step 3: Enable Auto-Deploy

In **Settings** → **Git**:
- ✅ **Auto-deploy:** Should be **ON**
- ✅ **Production Branch:** `main`
- ✅ **Preview Deployments:** Enabled (optional)

### Step 4: Test It

1. Make a small change:
   ```bash
   echo "// test" >> README.md
   git add README.md
   git commit -m "Test auto-deploy"
   git push origin main
   ```

2. Check Vercel Dashboard:
   - Should see a new deployment starting automatically
   - Within 1-2 minutes, should show "Building"

---

## Common Issues:

### Issue: "Repository not connected"
- **Fix:** Reconnect in Settings → Git

### Issue: "Auto-deploy disabled"
- **Fix:** Enable it in Settings → Git → Auto-deploy toggle

### Issue: "Wrong branch"
- **Fix:** Set Production Branch to `main` in Settings → Git

### Issue: "Webhook failed"
- **Fix:** Disconnect and reconnect the repository

---

## Verify It's Working:

After pushing to GitHub:
1. Go to Vercel → **Deployments** tab
2. Within 30-60 seconds, you should see:
   - New deployment appears
   - Status: "Building" → "Ready"
   - Trigger: "Git Push" (not "Manual")

---

## Quick Check:

**In Vercel Dashboard:**
- Go to your project
- Click **Settings** → **Git**
- What does it show?
  - Connected repository?
  - Auto-deploy enabled?
  - Production branch: `main`?

Share what you see and I can help fix it!









