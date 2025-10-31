# Run Migrations Manually on Vercel

Since Vercel isn't running migrations during build, here's how to run them manually:

## Option 1: Via API Route (Easiest)

After your deployment is live:

1. **Visit this URL** (replace with your domain):
   ```
   https://your-domain.vercel.app/api/migrate
   ```

2. **Check the response** - Should show migration output

3. **Verify migrations worked** by testing:
   ```
   https://your-domain.vercel.app/api/studies/chaos?system_type=logistic
   ```
   Should return studies (not empty).

---

## Option 2: Use Vercel CLI

If you have Vercel CLI installed:

```bash
# Set DATABASE_URL
export DATABASE_URL="your-neon-database-url"

# Run migrations
npm run migrate
```

---

## Option 3: Create a Migration Secret

1. Add a secret token in Vercel Environment Variables:
   - Name: `MIGRATION_SECRET`
   - Value: A random string (generate one)

2. Update `/api/migrate/route.ts` to check this token

3. Call the API with the token:
   ```
   https://your-domain.vercel.app/api/migrate?token=your-secret
   ```

---

## Quick Test

After running migrations, test these endpoints:

- `/api/studies/chaos?system_type=logistic` - Should return studies
- `/api/studies/lorenz/123e4567-e89b-12d3-a456-426614174000/trajectory` - Should return trajectory data
- `/complex-systems/logistic` - Should show studies

---

## Why Manual?

Vercel auto-detects Next.js and might not run custom build commands. Running migrations via API after deployment is a common pattern and gives you more control.



