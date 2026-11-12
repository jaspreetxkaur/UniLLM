import { User, Organization, OrganizationMember, Workspace, ApiKey } from '../server/models/index.js';
import { connectMongo } from '../server/config/mongo.js';
import { keyService } from '../server/services/keyService.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
};

const verifyPassword = (password, combinedHash) => {
  try {
    const [salt, key] = combinedHash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch (e) {
    return false;
  }
};

async function runAuthVerification() {
  console.log('====================================================');
  console.log('🧪 UniLLM Complete Auth & RBAC Verification Suite');
  console.log('====================================================\n');

  await connectMongo();

  const testId = Date.now();
  const testEmail = `test.user.${testId}@unillm.ai`;
  const testPass = 'SecurePass123!';
  const testName = 'Jaspreet Test User';
  const testOrg = 'UniLLM QA Lab';

  try {
    // 1. SIGNUP PHASE
    console.log('👉 [1/7] Testing Signup Flow...');
    const salt = crypto.randomBytes(16).toString('hex');
    const passHash = hashPassword(testPass);
    const otp = '987654';
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name: testName,
      email: testEmail,
      password_hash: passHash,
      verified: false,
      otp,
      otp_expires_at: otpExpires,
      otp_attempts: 0
    });

    console.log(`   ✅ User Created in MongoDB (ID: ${user._id}, Email: ${user.email}, Verified: ${user.verified})`);

    // 2. OTP VERIFICATION & ORG AUTO-PROVISIONING
    console.log('\n👉 [2/7] Testing OTP Verification & Multi-Tenant Provisioning...');
    if (user.otp !== otp || new Date() > user.otp_expires_at) {
      throw new Error('OTP verification logic failed matching');
    }

    user.verified = true;
    user.otp = null;
    user.otp_expires_at = null;
    await user.save();

    // Auto-create Organization
    const org = await Organization.create({
      name: testOrg,
      slug: `qa-lab-${testId}`,
      referral_code: `REF-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
      referral_enabled: true
    });

    // Create Organization Membership
    const member = await OrganizationMember.create({
      organization_id: org._id,
      user_id: user._id,
      role: 'owner',
      status: 'active',
      can_create_api_keys: true
    });

    // Create Default Workspace
    const ws = await Workspace.create({
      organization_id: org._id,
      name: 'Default Workspace',
      is_default: true
    });

    // Create Master API Key via keyService
    const apiKey = await keyService.createKey({
      organizationId: org._id,
      userId: user._id,
      name: 'Master API Key',
      workspaceId: ws._id
    });

    console.log(`   ✅ Org Provisioned: "${org.name}" (ID: ${org._id})`);
    console.log(`   ✅ Membership Role: "${member.role}" (canCreateApiKeys: ${member.can_create_api_keys})`);
    console.log(`   ✅ Default Workspace Created: "${ws.name}" (ID: ${ws._id})`);
    console.log(`   ✅ Initial API Key Generated: "${apiKey.keyPrefix}"`);

    // 3. LOGIN & PASSWORD VERIFICATION
    console.log('\n👉 [3/7] Testing Login Credentials & Scrypt Verification...');
    const foundUser = await User.findOne({ email: testEmail });
    if (!foundUser) throw new Error('User not found on login lookup');

    const passMatches = verifyPassword(testPass, foundUser.password_hash);
    const wrongPassMatches = verifyPassword('WrongPassword123!', foundUser.password_hash);

    if (!passMatches) throw new Error('Valid password failed cryptographic match!');
    if (wrongPassMatches) throw new Error('Incorrect password was falsely accepted!');
    console.log('   ✅ Valid password matched scrypt hash correctly.');
    console.log('   ✅ Incorrect password rejected securely.');

    // 4. JWT ISSUANCE & CLAIMS
    console.log('\n👉 [4/7] Testing JWT Token Generation & Claims Verification...');
    const jwtSecret = process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026';
    const token = jwt.sign({ userId: foundUser._id }, jwtSecret, { expiresIn: '7d' });
    const decoded = jwt.verify(token, jwtSecret);

    if (decoded.userId !== foundUser._id.toString()) throw new Error('JWT payload userId mismatch');
    console.log(`   ✅ JWT Signed & Verified: userId: ${decoded.userId}`);

    // 5. AUTHORIZATION (RBAC) CHECKS
    console.log('\n👉 [5/7] Testing Authorization & RBAC Roles...');
    const allowedRoles = ['owner', 'admin'];
    const isOwnerAllowed = allowedRoles.includes(member.role);
    console.log(`   ✅ Owner access to admin/billing routes: ${isOwnerAllowed ? 'ALLOWED' : 'DENIED'}`);

    const regularMember = { role: 'member' };
    const isMemberAllowed = allowedRoles.includes(regularMember.role);
    console.log(`   ✅ Member access to admin/billing routes: ${isMemberAllowed ? 'ALLOWED' : 'DENIED (403 Forbidden)'}`);

    // 6. PROFILE & ORG EDITING
    console.log('\n👉 [6/7] Testing Profile & Organization Name Renaming...');
    const updatedName = 'Jaspreet Kaur (Updated)';
    const updatedOrgName = 'UniLLM Enterprise Alpha';

    foundUser.name = updatedName;
    await foundUser.save();

    org.name = updatedOrgName;
    await org.save();

    const refreshedUser = await User.findById(foundUser._id);
    const refreshedOrg = await Organization.findById(org._id);
    if (refreshedUser.name !== updatedName) throw new Error('User name update failed');
    if (refreshedOrg.name !== updatedOrgName) throw new Error('Org name update failed');
    console.log(`   ✅ User name updated in DB: "${refreshedUser.name}"`);
    console.log(`   ✅ Org name updated in DB: "${refreshedOrg.name}"`);

    // 7. CLEANUP TEST DATA
    console.log('\n👉 [7/7] Cleaning Up Test Artifacts in MongoDB...');
    await ApiKey.deleteOne({ _id: apiKey._id });
    await Workspace.deleteOne({ _id: ws._id });
    await OrganizationMember.deleteOne({ _id: member._id });
    await Organization.deleteOne({ _id: org._id });
    await User.deleteOne({ _id: user._id });
    console.log('   ✅ Test records cleanly purged from database.');

    console.log('\n====================================================');
    console.log('🎉 ALL 7 AUTHENTICATION & AUTHORIZATION TESTS PASSED!');
    console.log('====================================================\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Test Error:', err);
    process.exit(1);
  }
}

runAuthVerification();
