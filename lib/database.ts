import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set!');
}

// Create connection pool
const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}) : null as any;

// Query function
export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error('Database connection pool not initialized. DATABASE_URL environment variable is missing.');
  }
  
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test connection
export async function testConnection() {
  try {
    const result = await query('SELECT NOW()');
    return { connected: true, time: result.rows[0].now };
  } catch (error) {
    return { connected: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
