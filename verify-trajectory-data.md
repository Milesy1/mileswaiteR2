# Verify Trajectory Data Was Seeded

## Quick Check Commands

Run these in your Neon SQL Editor to verify data:

### 1. Check if trajectory data exists:
```sql
SELECT COUNT(*) FROM trajectories 
WHERE study_id = '123e4567-e89b-12d3-a456-426614174000';
```

**Expected:** Should return ~1000 rows (if migration 004 ran successfully)

### 2. Check study exists:
```sql
SELECT id, name, system_type FROM studies 
WHERE id = '123e4567-e89b-12d3-a456-426614174000';
```

**Expected:** Should return the Lorenz study

### 3. Check sample trajectory points:
```sql
SELECT timestep, time, x, y, z 
FROM trajectories 
WHERE study_id = '123e4567-e89b-12d3-a456-426614174000' 
ORDER BY timestep 
LIMIT 10;
```

**Expected:** Should return 10 rows with trajectory data

---

## If trajectory count is 0:

Migration 004 didn't run or failed. Re-run it:
```sql
-- Copy and paste entire content of migrations/004_seed_lorenz_trajectory.sql
-- Run in Neon SQL Editor
```

---

## If trajectory count > 0 but API still fails:

Check the API route logs in Vercel → Functions → View logs for `/api/studies/lorenz/[id]/trajectory`



