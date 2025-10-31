# Fix: Migrations Not Running During Build

## Problem
Migrations aren't running during Vercel builds. The build logs don't show migration output.

## Solution: Set Build Command in Vercel Settings

Vercel might be ignoring `package.json` build script. Set it explicitly:

### Steps:

1. **Go to Vercel Dashboard**
   - Your project → **Settings** → **General**

2. **Scroll to "Build & Development Settings"**

3. **Set Build Command:**
   ```
   npm run migrate && npm run build:skip-migrate
   ```
   Or simpler:
   ```
   npm run migrate && next build
   ```

4. **Save Settings**

5. **Redeploy**

---

## Alternative: Check Current Build Command

In Vercel Settings → General → Build & Development Settings:

- What does "Build Command" currently show?
- If it's empty or says "Use default", migrations won't run
- Set it explicitly to: `npm run migrate && next build`

---

## Why This Happens

- Vercel auto-detects Next.js and might override package.json scripts
- Build commands in Vercel Settings take precedence
- Need to set it explicitly for migrations to run





