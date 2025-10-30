# Production Database Setup Guide

This guide walks you through updating your production Neon database with all migrations and seed data.

## 🚀 Quick Start (Automated - Recommended)

**Easiest way - just run one command:**

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url-from-neon"

# Run all migrations automatically
npm run migrate
```

That's it! The script will:
- ✅ Connect to your database
- ✅ Run all migrations in order
- ✅ Skip migrations that are already applied
- ✅ Show progress and summary
- ✅ Handle errors gracefully

## ⚠️ Important: Committing ≠ Running Migrations

**Committing migration files to GitHub does NOT automatically run them.** You need to:

### Option A: Run Manually After Deploy (Simplest)
1. Deploy your code to Vercel
2. After deployment, run: `DATABASE_URL="your-prod-url" npm run migrate`

### Option B: Automatic Migrations (Recommended)
Set up one of these:

**GitHub Actions** (`.github/workflows/migrate-database.yml`):
- Runs migrations automatically when you push migration files
- Requires `DATABASE_URL` secret in GitHub Settings → Secrets

**Vercel Deployment Hook**:
- Create a Vercel deployment hook that runs `npm run migrate` after deploy
- Set `DATABASE_URL` in Vercel environment variables

**Manual Trigger**:
- After each deployment, visit your deployment and trigger migrations manually

## Migration Order

Run these migrations **in order**:

1. `001_create_complex_systems_tables.sql` - Creates all tables
2. `002_add_logistic_system_type.sql` - Adds 'logistic' to system_type constraint
3. `003_seed_initial_studies.sql` - Seeds base studies (Lorenz & Logistic)
4. `004_seed_lorenz_trajectory.sql` - Seeds Lorenz trajectory data
5. `005_seed_logistic_data.sql` - Seeds bifurcation data and Feigenbaum constants

## Method 1: Automated Script (Fastest & Recommended) ⭐

Just run:
```bash
DATABASE_URL="your-production-database-url" npm run migrate
```

The script automatically:
- Runs all migrations in order
- Skips already-applied migrations
- Shows progress and timing
- Handles errors gracefully

## Method 2: Using Neon Dashboard (Manual)

1. **Go to Neon Dashboard**: https://console.neon.tech
2. **Select your project**
3. **Click "SQL Editor"** in the left sidebar
4. **Copy and paste each migration file** one at a time
5. **Click "Run"** after each migration
6. **Verify** each migration succeeded before running the next

## Method 2: Using psql Command Line

```bash
# Connect to your production database
psql "your-production-database-url-here"

# Run migrations in order
\i migrations/001_create_complex_systems_tables.sql
\i migrations/002_add_logistic_system_type.sql
\i migrations/003_seed_initial_studies.sql
\i migrations/004_seed_lorenz_trajectory.sql
\i migrations/005_seed_logistic_data.sql
```

## Method 3: Using Environment Variable (From Project Root)

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-production-database-url"

# Connect and run migrations
psql $DATABASE_URL -f migrations/001_create_complex_systems_tables.sql
psql $DATABASE_URL -f migrations/002_add_logistic_system_type.sql
psql $DATABASE_URL -f migrations/003_seed_initial_studies.sql
psql $DATABASE_URL -f migrations/004_seed_lorenz_trajectory.sql
psql $DATABASE_URL -f migrations/005_seed_logistic_data.sql
```

## Verification Queries

After running all migrations, verify the data:

```sql
-- Check studies exist
SELECT id, name, system_type FROM studies;

-- Check Lorenz trajectory data
SELECT COUNT(*) as trajectory_points 
FROM trajectories 
WHERE study_id = '123e4567-e89b-12d3-a456-426614174000'::uuid;

-- Check Logistic bifurcation data
SELECT COUNT(*) as bifurcation_points 
FROM bifurcation_data 
WHERE study_id = '223e4567-e89b-12d3-a456-426614174111'::uuid;

-- Check Feigenbaum constants
SELECT constant_name, value 
FROM universal_constants 
WHERE study_id = '223e4567-e89b-12d3-a456-426614174111'::uuid;
```

## Expected Results

After all migrations:

- ✅ **2 studies** (Lorenz and Logistic)
- ✅ **~1,001 trajectory points** for Lorenz study
- ✅ **~1,500 bifurcation points** for Logistic study
- ✅ **2 Feigenbaum constants** for Logistic study
- ✅ **Chaos metrics** for both studies

## Troubleshooting

### Error: "relation already exists"
- The tables already exist. Skip `001_create_complex_systems_tables.sql` and run the rest.

### Error: "constraint already exists"
- The constraint was already updated. Skip `002_add_logistic_system_type.sql`.

### Error: "duplicate key value"
- The data was already seeded. This is safe to ignore - migrations use `ON CONFLICT DO NOTHING`.

### Performance Notes
- `004_seed_lorenz_trajectory.sql` may take 30-60 seconds
- `005_seed_logistic_data.sql` may take 1-2 minutes (generates ~1,500 points)

## Environment Variables

Make sure your production environment has:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

## Post-Migration Checklist

- [ ] All tables created successfully
- [ ] Studies seeded (check `/api/studies/chaos`)
- [ ] Lorenz trajectory data exists (check 3D visualization)
- [ ] Logistic bifurcation data exists (check bifurcation diagram)
- [ ] Feigenbaum constants visible (check study page)
- [ ] API endpoints returning data correctly

## Rollback (If Needed)

If you need to rollback:

```sql
-- Remove all data (be careful!)
TRUNCATE trajectories, bifurcation_data, chaos_metrics, universal_constants, system_parameters, initial_conditions, studies CASCADE;

-- Drop tables (if needed)
DROP TABLE IF EXISTS trajectories CASCADE;
DROP TABLE IF EXISTS bifurcation_data CASCADE;
DROP TABLE IF EXISTS chaos_metrics CASCADE;
DROP TABLE IF EXISTS universal_constants CASCADE;
DROP TABLE IF EXISTS sensitivity_data CASCADE;
DROP TABLE IF EXISTS system_parameters CASCADE;
DROP TABLE IF EXISTS initial_conditions CASCADE;
DROP TABLE IF EXISTS studies CASCADE;
```

