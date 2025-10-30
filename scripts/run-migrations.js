#!/usr/bin/env node

/**
 * Automated Database Migration Runner
 * Runs all migrations in order from the migrations/ directory
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Get database URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
  console.error('Set it like: DATABASE_URL="postgresql://..." node scripts/run-migrations.js');
  process.exit(1);
}

// Create connection pool
const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL.includes('localhost') ? false : {
    rejectUnauthorized: false
  }
});

// Migration files in order
const migrations = [
  '001_create_complex_systems_tables.sql',
  '002_add_logistic_system_type.sql',
  '003_seed_initial_studies.sql',
  '004_seed_lorenz_trajectory.sql',
  '005_seed_logistic_data.sql'
];

async function runMigration(filename) {
  const filePath = path.join(__dirname, '..', 'migrations', filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Warning: Migration file not found: ${filename}`);
    return { success: false, skipped: true };
  }

  const sql = fs.readFileSync(filePath, 'utf8');
  
  try {
    console.log(`\n📄 Running: ${filename}...`);
    const startTime = Date.now();
    
    await pool.query(sql);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Completed: ${filename} (${duration}s)`);
    
    return { success: true, duration };
  } catch (error) {
    // Check if it's a "already exists" error (safe to skip)
    if (error.message.includes('already exists') || 
        error.message.includes('duplicate') ||
        error.message.includes('constraint') && error.message.includes('already')) {
      console.log(`⏭️  Skipped: ${filename} (already applied)`);
      return { success: true, skipped: true };
    }
    
    console.error(`❌ Error in ${filename}:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting database migrations...\n');
  console.log(`📊 Database: ${DATABASE_URL.split('@')[1]?.split('/')[0] || 'connected'}\n`);

  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful\n');

    // Run migrations in order
    const results = [];
    for (const migration of migrations) {
      const result = await runMigration(migration);
      results.push({ migration, ...result });
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Migration Summary:');
    console.log('='.repeat(50));
    
    const successful = results.filter(r => r.success && !r.skipped).length;
    const skipped = results.filter(r => r.skipped).length;
    const failed = results.filter(r => !r.success && !r.skipped).length;

    results.forEach(({ migration, success, skipped, duration }) => {
      const status = skipped ? '⏭️  SKIPPED' : success ? '✅ SUCCESS' : '❌ FAILED';
      const time = duration ? ` (${duration}s)` : '';
      console.log(`${status} - ${migration}${time}`);
    });

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Successful: ${successful}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    if (failed > 0) {
      console.log(`❌ Failed: ${failed}`);
    }
    console.log('='.repeat(50) + '\n');

    if (failed === 0) {
      console.log('🎉 All migrations completed successfully!');
      process.exit(0);
    } else {
      console.log('⚠️  Some migrations failed. Check errors above.');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

