import pool, { query } from '../server/config/db.js';

async function testConnection() {
  console.log('🔄 Connecting to Supabase PostgreSQL...');
  try {
    const result = await query('SELECT NOW() as current_time, version() as pg_version;');
    console.log('✅ [SUCCESS] Connected to Supabase PostgreSQL successfully!');
    console.log('👉 Server Time:', result.rows[0].current_time);
    console.log('👉 PostgreSQL Version:', result.rows[0].pg_version);
    process.exit(0);
  } catch (err) {
    console.error('❌ [ERROR] Database connection failed:');
    console.error(err.message);
    process.exit(1);
  }
}

testConnection();
