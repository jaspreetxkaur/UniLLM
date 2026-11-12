import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
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

async function runRestore() {
  const backupFile = process.argv[2] || path.join(__dirname, '../backups/pg_backup_baseline.json');

  console.log('====================================================');
  console.log('📥 UNI LLM: RESTORE MONGODB FROM BACKUP JSON');
  console.log('====================================================');
  console.log(`Using backup file: ${backupFile}\n`);

  if (!fs.existsSync(backupFile)) {
    console.error(`❌ Backup file not found: ${backupFile}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(backupFile, 'utf8');
  const backupData = JSON.parse(rawData);

  await connectMongo();

  const BATCH_SIZE = 200;
  const stats = {};
  let grandTotal = 0;

  for (const { table, model, name } of TABLE_MODEL_MAP) {
    const rows = backupData[table] || [];
    const totalRows = rows.length;
    console.log(`📦 Restoring [${table}] (${totalRows} records) -> [${model.collection.name}]...`);

    for (let i = 0; i < totalRows; i += BATCH_SIZE) {
      const batchRows = rows.slice(i, i + BATCH_SIZE);
      const bulkOps = batchRows.map((row) => {
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
        await model.bulkWrite(bulkOps);
      }
    }

    const currentMongoCount = await model.countDocuments();
    stats[table] = {
      sourceCount: totalRows,
      mongoCount: currentMongoCount,
      pass: currentMongoCount >= totalRows
    };
    grandTotal += totalRows;

    console.log(`   ✅ [${name}] Restored. Source: ${totalRows}, MongoDB: ${currentMongoCount}`);
  }

  console.log('\n====================================================');
  console.log('📊 RESTORATION INTEGRITY SUMMARY');
  console.log('====================================================\n');
  console.table(stats);

  const allPassed = Object.values(stats).every((s) => s.pass);
  console.log(`\nTotal records processed: ${grandTotal}`);
  console.log(`Status: ${allPassed ? '✅ ALL COLLECTIONS RESTORED SUCCESSFULLY' : '⚠️ SOME COUNTS MISMATCHED'}\n`);

  await disconnectMongo();
}

runRestore().catch((err) => {
  console.error('❌ Restore failed:', err);
  process.exit(1);
});
