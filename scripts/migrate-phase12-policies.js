import { query } from '../server/config/db.js';

const migrationSql = `
-- 1. Create routing_policies Table
CREATE TABLE IF NOT EXISTS routing_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 10,
  condition_type VARCHAR(50) NOT NULL,
  condition_config JSONB NOT NULL DEFAULT '{}',
  action_type VARCHAR(50) NOT NULL,
  action_config JSONB NOT NULL DEFAULT '{}',
  created_by_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Performance Index for Tenant Scoping & Priority-Based Retrieval
CREATE INDEX IF NOT EXISTS idx_routing_policies_org_prio 
ON routing_policies(organization_id, enabled, priority ASC, created_at ASC);
`;

async function runMigration() {
  console.log('🚀 Running Phase 12 Routing Policies Schema Migration on Supabase...');
  try {
    await query(migrationSql);
    console.log('✅ [SUCCESS] Table routing_policies and index created successfully!');
    
    // Query table list to verify
    const verifyRes = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    
    console.log('\n📊 Tables currently in Supabase:');
    verifyRes.rows.forEach(r => console.log(`  - ${r.table_name}`));
    
    process.exit(0);
  } catch (err) {
    console.error('❌ [ERROR] Migration failed:');
    console.error(err.message);
    process.exit(1);
  }
}

runMigration();
