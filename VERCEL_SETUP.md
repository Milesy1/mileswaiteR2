# Vercel Environment Variables Setup

## Quick Setup Steps

### 1. Add DATABASE_URL in Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Click **"Add New"**
4. **Name:** `DATABASE_URL`
5. **Value:** Your Neon database connection string (from Neon dashboard)
6. **Environment:** Select all (Production, Preview, Development)
7. Click **"Save"**

### 2. Your Neon Database URL

Get it from Neon dashboard:
- Go to your Neon project
- Click **"Connection Details"**
- Copy the connection string (starts with `postgresql://...`)

It looks like:
```
postgresql://neondb_owner:password@ep-calm-wave-abdxkqjz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Run Migrations

**Option A: Manual (One-time)**

After adding the environment variable, run migrations manually:

1. Go to Vercel dashboard → Your project → **Deployments**
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"** (this will trigger migrations automatically if configured)

**Option B: Automatic (On Every Deploy)**

Migrations are configured to run automatically during build (see `vercel.json`).

### 4. Verify Migrations Ran

After deployment, check the build logs:
- Go to deployment → **"Build Logs"**
- Look for: `📄 Running: 001_create_complex_systems_tables.sql...`
- Should see: `✅ Migration completed successfully`

### 5. Test Your Site

Visit your deployed site and check:
- `/complex-systems/logistic` - Should show studies
- `/complex-systems/lorenz/[id]` - Should show 3D visualization
- `/complex-systems/api` - API documentation should work

---

## Troubleshooting

**Problem:** "DATABASE_URL not set" error
- **Solution:** Make sure you added it in Vercel Environment Variables and selected all environments

**Problem:** Migrations not running
- **Solution:** Check `vercel.json` buildCommand includes `npm run migrate`

**Problem:** Migration errors
- **Solution:** Check build logs for specific SQL errors. Some migrations might need to be run manually first.

---

## Next Steps

Once migrations are complete:
1. ✅ Database tables created
2. ✅ Sample studies seeded
3. ✅ Trajectory data loaded
4. ✅ Your site should be fully functional!
