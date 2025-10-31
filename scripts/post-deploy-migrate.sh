#!/bin/bash
# Post-deployment migration script
# This can be run as a Vercel deployment hook or manually

echo "🚀 Running post-deployment migrations..."

if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL not set"
  exit 1
fi

npm run migrate

if [ $? -eq 0 ]; then
  echo "✅ Migrations completed successfully"
  exit 0
else
  echo "❌ Migrations failed"
  exit 1
fi





