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

async function testConnection() {
  console.log('🧪 Testing MongoDB Connection and Mongoose Models...');
  
  await connectMongo();
  console.log('✅ MongoDB connected successfully.');

  const models = [
    { name: 'User', model: User },
    { name: 'Organization', model: Organization },
    { name: 'OrganizationMember', model: OrganizationMember },
    { name: 'Workspace', model: Workspace },
    { name: 'ApiKey', model: ApiKey },
    { name: 'AiRequest', model: AiRequest },
    { name: 'OrganizationBudget', model: OrganizationBudget },
    { name: 'AuditLog', model: AuditLog },
    { name: 'RoutingPolicy', model: RoutingPolicy }
  ];

  for (const { name, model } of models) {
    const count = await model.countDocuments();
    console.log(`   ✓ Model ${name} registered. Current count: ${count}`);
  }

  await disconnectMongo();
  console.log('🎉 MongoDB connection and models verified cleanly!');
  process.exit(0);
}

testConnection().catch(err => {
  console.error('❌ MongoDB Test Error:', err);
  process.exit(1);
});
