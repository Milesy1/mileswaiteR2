// Migration script to move data from file to Vercel KV
const { kv } = require('@vercel/kv');
const fs = require('fs');
const path = require('path');

async function migrateData() {
  try {
    // Read existing data from file
    const dataFile = path.join(process.cwd(), 'public', 'data', 'now.json');
    
    if (fs.existsSync(dataFile)) {
      const fileData = fs.readFileSync(dataFile, 'utf8');
      const data = JSON.parse(fileData);
      
      console.log('Migrating data to Vercel KV...');
      await kv.set('now-data', data);
      console.log('✅ Data migrated successfully!');
    } else {
      console.log('No existing data file found.');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateData();
