import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { query } from '../server/config/db.js';
import { connectMongo, disconnectMongo } from '../server/config/mongo.js';
import {
  User,
  Organization,
  OrganizationMember,
  Workspace,
  ApiKey,
  AiRequest,
  OrganizationBudget,
  AuditLog,
  RoutingPolicy
} from '../server/models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TABLE_MODEL_MAP = [
  { table: 'users', model: User, name: 'User' },
  { table: 'organizations', model: Organization, name: 'Organization' },
  { table: 'organization_members', model: OrganizationMember, name: 'OrganizationMember' },
  { table: 'workspaces', model: Workspace, name: 'Workspace' },
  { table: 'api_keys', model: ApiKey, name: 'ApiKey' },
  { table: 'ai_requests', model: AiRequest, name: 'AiRequest' },
  { table: 'organization_budgets', model: OrganizationBudget, name: 'OrganizationBudget' },
  { table: 'audit_logs', model: AuditLog, name: 'AuditLog' },
  { table: 'routing_policies', model: RoutingPolicy, name: 'RoutingPolicy' }
];

// Helper to safely parse JSON/JSONB fields
const safeJson = (val) => {
  if (val === null || val === undefined) return {};
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
};

// Transform a PostgreSQL row into a clean MongoDB document
function transformRow(table, row) {
  const doc = { _id: row.id };

  switch (table) {
    case 'users':
      doc.name = row.name;
      doc.email = row.email ? row.email.toLowerCase().trim() : '';
      doc.password_hash = row.password_hash;
      doc.verified = Boolean(row.verified);
      doc.otp = row.otp || null;
      doc.otp_expires_at = row.otp_expires_at ? new Date(row.otp_expires_at) : null;
      doc.otp_attempts = parseInt(row.otp_attempts, 10) || 0;
      doc.created_at = row.created_at ? new Date(row.created_at) : new Date();
      doc.updated_at = row.updated_at ? new Date(row.updated_at) : new Date();
      break;

    case 'organizations':
      doc.name = row.name;
      doc.slug = row.slug;
      doc.referral_code = row.referral_code;
      doc.referral_enabled = row.referral_enabled !== false;
      doc.created_at = row.created_at ? new Date(row.created_at) : new Date();
      break;

    case 'organization_members':
      doc.organization_id = row.organization_id;
      doc.user_id = row.user_id;
      doc.role = row.role || 'member';
      doc.status = row.status || 'active';
      doc.monthly_token_limit = row.monthly_token_limit ? parseInt(row.monthly_token_limit, 10) : null;
      doc.monthly_spend_limit_usd = row.monthly_spend_limit_usd !== null ? parseFloat(row.monthly_spend_limit_usd) : null;
      doc.can_create_api_keys = row.can_create_api_keys !== false;
      doc.joined_at = row.joined_at ? new Date(row.joined_at) : new Date();
      break;

    case 'workspaces':
      doc.organization_id = row.organization_id;
      doc.name = row.name;
      doc.is_default = Boolean(row.is_default);
      doc.created_at = row.created_at ? new Date(row.created_at) : new Date();
      break;

    case 'api_keys':
      doc.organization_id = row.organization_id;
      doc.workspace_id = row.workspace_id;
      doc.created_by_user_id = row.created_by_user_id;
      doc.name = row.name;
      doc.key_prefix = row.key_prefix;
      doc.key_hash = row.key_hash;
      doc.status = row.status || 'active';
      doc.last_used_at = row.last_used_at ? new Date(row.last_used_at) : null;
      doc.created_at = row.created_at ? new Date(row.created_at) : new Date();
      break;

    case 'ai_requests':
      doc.organization_id = row.organization_id;
      doc.workspace_id = row.workspace_id;
      doc.api_key_id = row.api_key_id || null;
      doc.user_id = row.user_id || null;
      doc.request_type = row.request_type || 'chat';
      doc.provider = row.provider;
      doc.model = row.model;
      doc.prompt_tokens = parseInt(row.prompt_tokens, 10) || 0;
      doc.completion_tokens = parseInt(row.completion_tokens, 10) || 0;
      doc.total_tokens = parseInt(row.total_tokens, 10) || 0;
      doc.cost_usd = row.cost_usd !== null ? parseFloat(row.cost_usd) : 0.000000;
      doc.latency_ms = parseInt(row.latency_ms, 10) || 0;
      doc.status = row.status || 'success';
      doc.status_code = parseInt(row.status_code, 10) || 200;
      doc.cache_status = row.cache_status || 'MISS';
      doc.is_fallback = Boolean(row.is_fallback);
      doc.error_message = row.error_message || null;
      doc.request_metadata = safeJson(row.request_metadata);
      doc.created_at = row.created_at ? new Date(row.created_at) : new Date();
      break;

    case 'organization_budgets':
      doc.organization_id = row.organization_id;
      doc.monthly_budget_usd = row.monthly_budget_usd !== null ? parseFloat(row.monthly_budget_usd) : 100.00;
      doc.alert_threshold_percent = parseInt(row.alert_threshold_percent, 10) || 80;
      doc.hard_limit_enabled = row.hard_limit_enabled !== false;
      doc.current_period_start = row.current_period_start ? new Date(row.current_period_start) : new Date();
      break;

    case 'audit_logs':
      doc.organization_id = row.organization_id;
      doc.actor_id = row.actor_id || null;
      doc.action = row.action;
      doc.details = safeJson(row.details);
      doc.ip_address = row.ip_address || null;
      doc.created_at = row.created_at ? new Date(row.created_at) : new Date();
      break;

    case 'routing_policies':
      doc.organization_id = row.organization_id;
      doc.name = row.name;
      doc.description = row.description || '';
      doc.enabled = row.enabled !== false;
      doc.priority = parseInt(row.priority, 10) || 10;
      doc.condition_type = row.condition_type;
      doc.condition_config = safeJson(row.condition_config);
      doc.action_type = row.action_type;
      doc.action_config = safeJson(row.action_config);
      doc.created_by_user_id = row.created_by_user_id || null;
      doc.created_at = row.created_at ? new Date(row.created_at) : new Date();
      doc.updated_at = row.updated_at ? new Date(row.updated_at) : new Date();
      break;

    default:
      Object.assign(doc, row);
  }

  return doc;
}

async function runMigration() {
  console.log('====================================================');
  console.log('🚀 UNI LLM: POSTGRESQL TO MONGODB DATA MIGRATION');
  console.log('====================================================\n');

  await connectMongo();

  const migrationStats = {
    startedAt: new Date().toISOString(),
    collections: {},
    integrity: {},
    totalMigrated: 0
  };

  const BATCH_SIZE = 200;

  // 1. Migrate each table in batches using idempotent upserts
  for (const { table, model, name } of TABLE_MODEL_MAP) {
    console.log(`\n📦 Migrating table: [${table}] -> MongoDB Collection: [${model.collection.name}]...`);
    
    // Read all rows from PostgreSQL
    const res = await query(`SELECT * FROM ${table} ORDER BY id ASC;`);
    const totalRows = res.rows.length;
    console.log(`   Source records count: ${totalRows}`);

    let processed = 0;
    let upsertedCount = 0;

    for (let i = 0; i < totalRows; i += BATCH_SIZE) {
      const batchRows = res.rows.slice(i, i + BATCH_SIZE);
      const bulkOps = batchRows.map(row => {
        const doc = transformRow(table, row);
        return {
          updateOne: {
            filter: { _id: doc._id },
            update: { $set: doc },
            upsert: true
          }
        };
      });

      if (bulkOps.length > 0) {
        const bulkResult = await model.bulkWrite(bulkOps);
        upsertedCount += (bulkResult.upsertedCount + bulkResult.modifiedCount + bulkResult.matchedCount);
      }
      processed += batchRows.length;
    }

    migrationStats.collections[table] = {
      sourceCount: totalRows,
      mongoCount: await model.countDocuments(),
      processed
    };
    migrationStats.totalMigrated += totalRows;

    console.log(`   ✅ [${name}] Migration finished. Source: ${totalRows}, MongoDB: ${migrationStats.collections[table].mongoCount}`);
  }

  // 2. PARITY & INTEGRITY VERIFICATION
  console.log('\n====================================================');
  console.log('🔍 RUNNING COMPREHENSIVE DATA PARITY & INTEGRITY CHECKS');
  console.log('====================================================\n');

  let parityAllPass = true;

  for (const { table, model, name } of TABLE_MODEL_MAP) {
    const pgRes = await query(`SELECT id FROM ${table};`);
    const pgIds = new Set(pgRes.rows.map(r => r.id));
    
    const mongoDocs = await model.find({}, { _id: 1 }).lean();
    const mongoIds = new Set(mongoDocs.map(d => d._id));

    const missingInMongo = [...pgIds].filter(id => !mongoIds.has(id));
    const extraInMongo = [...mongoIds].filter(id => !pgIds.has(id));

    const countMatch = pgIds.size === mongoIds.size;
    const noMissing = missingInMongo.length === 0;
    const noExtra = extraInMongo.length === 0;

    const pass = countMatch && noMissing && noExtra;
    if (!pass) parityAllPass = false;

    migrationStats.integrity[table] = {
      pgCount: pgIds.size,
      mongoCount: mongoIds.size,
      missingCount: missingInMongo.length,
      extraCount: extraInMongo.length,
      pass
    };

    const statusIcon = pass ? '✅' : '❌';
    console.log(`${statusIcon} ${name}: PG=${pgIds.size} | Mongo=${mongoIds.size} | Missing=${missingInMongo.length} | Extra=${extraInMongo.length}`);
  }

  // 3. FOREIGN KEY RELATIONSHIP INTEGRITY
  console.log('\n🔗 Verifying Relational References in MongoDB:');
  const orgCount = await Organization.countDocuments();
  const userCount = await User.countDocuments();
  const wsCount = await Workspace.countDocuments();

  // Check Members -> Org & User
  const invalidMembers = await OrganizationMember.aggregate([
    {
      $lookup: {
        from: 'organizations',
        localField: 'organization_id',
        foreignField: '_id',
        as: 'org'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $match: {
        $or: [
          { 'org.0': { $exists: false } },
          { 'user.0': { $exists: false } }
        ]
      }
    }
  ]);

  // Check Workspaces -> Org
  const invalidWorkspaces = await Workspace.aggregate([
    {
      $lookup: {
        from: 'organizations',
        localField: 'organization_id',
        foreignField: '_id',
        as: 'org'
      }
    },
    {
      $match: { 'org.0': { $exists: false } }
    }
  ]);

  // Check ApiKeys -> Org & Workspace
  const invalidKeys = await ApiKey.aggregate([
    {
      $lookup: {
        from: 'organizations',
        localField: 'organization_id',
        foreignField: '_id',
        as: 'org'
      }
    },
    {
      $lookup: {
        from: 'workspaces',
        localField: 'workspace_id',
        foreignField: '_id',
        as: 'ws'
      }
    },
    {
      $match: {
        $or: [
          { 'org.0': { $exists: false } },
          { 'ws.0': { $exists: false } }
        ]
      }
    }
  ]);

  console.log(`   - Invalid Org Members References: ${invalidMembers.length}`);
  console.log(`   - Invalid Workspaces References: ${invalidWorkspaces.length}`);
  console.log(`   - Invalid API Keys References: ${invalidKeys.length}`);

  migrationStats.relationshipIntegrity = {
    invalidMembers: invalidMembers.length,
    invalidWorkspaces: invalidWorkspaces.length,
    invalidKeys: invalidKeys.length,
    pass: invalidMembers.length === 0 && invalidWorkspaces.length === 0 && invalidKeys.length === 0
  };

  migrationStats.completedAt = new Date().toISOString();
  migrationStats.overallPass = parityAllPass && migrationStats.relationshipIntegrity.pass;

  // Save manifest
  const reportPath = path.join(__dirname, '..', 'backups', 'migration_verification_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(migrationStats, null, 2), 'utf-8');

  console.log('\n====================================================');
  if (migrationStats.overallPass) {
    console.log('🎉 100% DATA PARITY & INTEGRITY CONFIRMED!');
    console.log(`📄 Verification report written to: ${reportPath}`);
  } else {
    console.error('❌ MIGRATION INTEGRITY FAILED. Please review report.');
  }
  console.log('====================================================\n');

  await disconnectMongo();
  process.exit(migrationStats.overallPass ? 0 : 1);
}

runMigration().catch(err => {
  console.error('Fatal migration script error:', err);
  process.exit(1);
});
