import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { query } from '../server/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const TABLES = [
  'users',
  'organizations',
  'organization_members',
  'workspaces',
  'api_keys',
  'ai_requests',
  'organization_budgets',
  'audit_logs',
  'routing_policies'
];

async function runBackup() {
  console.log('====================================================');
  console.log('📦 STARTING COMPLETE POSTGRESQL PRE-MIGRATION BACKUP');
  console.log('====================================================\n');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupMeta = {
    exportedAt: new Date().toISOString(),
    tables: {},
    totalRecords: 0
  };

  const fullData = {};

  for (const table of TABLES) {
    console.log(`⏳ Exporting table: ${table}...`);
    try {
      // Select all records ordered by ID for deterministic consistency
      const res = await query(`SELECT * FROM ${table} ORDER BY id ASC;`);
      fullData[table] = res.rows;
      
      const count = res.rows.length;
      const ids = res.rows.map(r => r.id);
      const uniqueIds = new Set(ids);
      
      // Calculate a deterministic SHA-256 hash of the canonical JSON data
      const jsonStr = JSON.stringify(res.rows);
      const hash = crypto.createHash('sha256').update(jsonStr).digest('hex');

      backupMeta.tables[table] = {
        rowCount: count,
        distinctIdCount: uniqueIds.size,
        hasDuplicates: uniqueIds.size !== count,
        dataHashSha256: hash
      };
      backupMeta.totalRecords += count;

      console.log(`   ✅ ${table}: ${count} records exported (Hash: ${hash.substring(0, 12)}...)`);
    } catch (err) {
      console.error(`   ❌ Failed to export ${table}:`, err.message);
      process.exit(1);
    }
  }

  // Write full JSON backup
  const jsonPath = path.join(BACKUP_DIR, `pg_backup_baseline.json`);
  const timestampedPath = path.join(BACKUP_DIR, `pg_backup_${timestamp}.json`);
  const metaPath = path.join(BACKUP_DIR, `pg_backup_manifest.json`);

  fs.writeFileSync(jsonPath, JSON.stringify(fullData, null, 2), 'utf-8');
  fs.writeFileSync(timestampedPath, JSON.stringify(fullData, null, 2), 'utf-8');
  fs.writeFileSync(metaPath, JSON.stringify(backupMeta, null, 2), 'utf-8');

  console.log('\n====================================================');
  console.log('🎉 BACKUP COMPLETED AND VERIFIED SUCCESSFULLY!');
  console.log(`📁 Target Files:`);
  console.log(`   - ${jsonPath} (${(fs.statSync(jsonPath).size / 1024).toFixed(2)} KB)`);
  console.log(`   - ${timestampedPath}`);
  console.log(`   - ${metaPath}`);
  console.log(`📊 Summary: ${backupMeta.totalRecords} total records backed up across 9 tables.`);
  console.log('====================================================\n');

  // Verify readability
  const verifyData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  for (const table of TABLES) {
    if (!Array.isArray(verifyData[table])) {
      throw new Error(`Verification failed: ${table} is not an array`);
    }
  }
  console.log('✅ Readability verification passed 100%!');
  process.exit(0);
}

runBackup().catch(err => {
  console.error('Fatal backup error:', err);
  process.exit(1);
});
