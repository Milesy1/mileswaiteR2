# Setting Up GitHub Secrets for Automatic Migrations

## Step-by-Step Instructions

### Option 1: Direct Navigation

1. Go to your repository: **https://github.com/Milesy1/mileswaiteR2**
2. Click **"Settings"** tab (top right of the repo)
3. In the left sidebar, click **"Secrets and variables"**
4. Click **"Actions"**
5. Click **"New repository secret"** button
6. **Name:** `DATABASE_URL`
7. **Secret:** Paste your production Neon database URL
8. Click **"Add secret"**

### Option 2: Direct Link Format

The full path is:
```
https://github.com/Milesy1/mileswaiteR2/settings/secrets/actions
```

### What You Need

Your **production** Neon database URL looks like:
```
postgresql://neondb_owner:password@ep-calm-wave-abdxkqjz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Where to find it:**
1. Go to https://console.neon.tech
2. Select your production project
3. Click "Connection Details"
4. Copy the connection string

### After Adding the Secret

Once you add `DATABASE_URL` as a GitHub secret:
- ✅ The GitHub Action will automatically run migrations when you push migration files
- ✅ You can also manually trigger it: Actions tab → "Run Database Migrations" → "Run workflow"

### Testing Without GitHub Actions

If you prefer not to use GitHub Actions, you can always run migrations manually:

```bash
DATABASE_URL="your-production-url" npm run migrate
```





