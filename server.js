import express from 'express';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectMongo } from './server/config/mongo.js';
import { User, Organization, OrganizationMember, Workspace, OrganizationBudget, AuditLog } from './server/models/index.js';
import { authenticateUser } from './server/middleware/auth.js';
import keyRoutes from './server/routes/keyRoutes.js';
import gatewayRoutes from './server/routes/gatewayRoutes.js';
import analyticsRoutes from './server/routes/analyticsRoutes.js';
import teamRoutes from './server/routes/teamRoutes.js';
import workspaceRoutes from './server/routes/workspaceRoutes.js';
import auditRoutes from './server/routes/auditRoutes.js';
import cacheRoutes from './server/routes/cacheRoutes.js';
import organizationRoutes from './server/routes/organizationRoutes.js';
import policyRoutes from './server/routes/policyRoutes.js';
import oauthRoutes from './server/routes/oauthRoutes.js';
import demoRoutes from './server/routes/demoRoutes.js';
import { authLimiter, gatewayLimiter } from './server/middleware/rateLimiter.js';
import { keyService } from './server/services/keyService.js';

import http from 'http';
import { initRealtimeServer } from './server/realtime/socket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5173;
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('❌ [FATAL ERROR]: JWT_SECRET must be explicitly set in production!');
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026';

app.set('trust proxy', 1);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// Safe Health Check Endpoint for Container / Load Balancer Monitoring
app.get('/api/health', (req, res) => {
  return res.json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Rate Limiter for Auth Routes
app.use('/api/auth', authLimiter);

// Mount OAuth Routes (Google & GitHub SSO)
app.use('/api/auth/oauth', oauthRoutes);

// Mount Routers
app.use('/api/keys', keyRoutes);
app.use('/api/v1', gatewayLimiter, gatewayRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/audit-logs', auditRoutes);
app.use('/api/cache', cacheRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/demo', demoRoutes);

// Helper: Generate secure referral codes
const generateReferralCode = () => {
  const token = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `EMP-${token}`;
};

// Helper: Cryptographically secure 6-digit OTP code generator
const generateSecureOtp = () => crypto.randomInt(100000, 1000000).toString();

// Helper: Determine if OTP disclosure is authorized for test/sandbox environments
const isTestOtpExposureAllowed = (req) => {
  // 1. Strict production lockout: Never disclose OTPs in production under any circumstance
  if (process.env.NODE_ENV === 'production') return false;

  // 2. In development/testing, allow OTP delivery so local and demo setups work without external SMTP
  return true;
};

// Helper: Scrypt Password Hashing
const hashPassword = (password, salt = null) => {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, actualSalt, 64);
  return `${actualSalt}:${derivedKey.toString('hex')}`;
};

// Helper: Verify Password
const verifyPassword = (password, storedHash) => {
  if (!storedHash) return false;
  if (!storedHash.includes(':')) {
    const oldHash = crypto.createHash('sha256').update(password).digest('hex');
    return oldHash === storedHash;
  }
  const [salt, hash] = storedHash.split(':');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  const hashBuffer = Buffer.from(hash, 'hex');
  if (hashBuffer.length !== derivedKey.length) return false;
  return crypto.timingSafeEqual(hashBuffer, derivedKey);
};

// Helper: Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Helper: Public User Payload (Sanitized - No JWT/Secrets)
const formatPublicUser = (user, orgName = 'Personal Space', role = 'owner', orgId = null) => ({
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  org: orgName,
  role: role || 'Owner',
  organizationId: orgId
});

// ============================================================================
// AUTHENTICATION ENDPOINTS (MONGODB-BACKED)
// ============================================================================

// 1. Sign Up Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, orgName, referralCode } = req.body;
    if (!name || !email || !password || typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    
    // Check referral code validity if provided
    let targetOrgId = null;
    let targetOrgName = null;
    let targetRole = 'owner';
    const submittedCode = (referralCode || '').trim().toUpperCase();

    if (submittedCode) {
      const org = await Organization.findOne({ referral_code: submittedCode }).lean();
      if (!org) {
        return res.status(400).json({ success: false, message: 'Invalid employee referral code.' });
      }
      if (!org.referral_enabled) {
        return res.status(400).json({ success: false, message: 'Employee referral joining is currently disabled for this organization.' });
      }
      targetOrgId = org._id;
      targetOrgName = org.name;
      targetRole = 'member';
    }

    // Generate 6-digit OTP code (crypto-secure)
    const otp = generateSecureOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
    const passHash = hashPassword(password);

    let userId;

    if (existingUser) {
      if (existingUser.verified) {
        return res.status(400).json({ success: false, message: 'Email address is already registered and verified. Please log in.' });
      }
      
      // Existing unverified account: update credentials and issue fresh OTP
      existingUser.name = name.trim();
      existingUser.password_hash = passHash;
      existingUser.otp = otp;
      existingUser.otp_expires_at = otpExpiresAt;
      existingUser.otp_attempts = 0;
      existingUser.updated_at = new Date();
      await existingUser.save();
      userId = existingUser._id;

      if (process.env.NODE_ENV !== 'production') {
        console.log(`==================================================`);
        console.log(`⚡ [UniLLM Auth Sandbox] Sign-Up OTP Refreshed (Unverified Account)`);
        console.log(`👉 User: ${name} (${trimmedEmail})`);
        console.log(`👉 Verification Code: ${otp}`);
        console.log(`==================================================`);
      }

      return res.json({
        success: true,
        message: 'Account pending verification. Fresh verification code generated.',
        ...(isTestOtpExposureAllowed(req) ? { otp } : {}),
        orgContext: { targetOrgId, targetOrgName, targetRole, preferredOrgName: orgName }
      });
    }

    // Create new user in MongoDB
    const newUser = await User.create({
      name: name.trim(),
      email: trimmedEmail,
      password_hash: passHash,
      verified: false,
      otp,
      otp_expires_at: otpExpiresAt,
      otp_attempts: 0
    });
    
    userId = newUser._id;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`==================================================`);
      console.log(`⚡ [UniLLM Auth Sandbox] Sign-Up OTP Code Generated`);
      console.log(`👉 User: ${name} (${trimmedEmail})`);
      console.log(`👉 Verification Code: ${otp}`);
      console.log(`==================================================`);
    }

    return res.json({
      success: true,
      message: 'Signed up successfully. Please verify your OTP.',
      ...(isTestOtpExposureAllowed(req) ? { otp } : {}),
      orgContext: { targetOrgId, targetOrgName, targetRole, preferredOrgName: orgName }
    });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ success: false, message: 'Database error during registration.' });
  }
});

// 2. Verify OTP & Initialize Multi-Tenant Organization
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp, orgContext } = req.body;
    if (!email || !otp || typeof email !== 'string' || typeof otp !== 'string') {
      return res.status(400).json({ success: false, message: 'Email and verification code are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    if (!user.otp || !user.otp_expires_at) {
      return res.status(400).json({ success: false, message: 'No active verification code found. Please request a new one.' });
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new code.' });
    }

    const attempts = (user.otp_attempts || 0) + 1;

    if (user.otp !== otp.trim()) {
      if (attempts >= 5) {
        user.otp = null;
        user.otp_expires_at = null;
        user.otp_attempts = 0;
        await user.save();
        return res.status(400).json({ success: false, message: 'Too many incorrect attempts. Verification code invalidated.' });
      }
      user.otp_attempts = attempts;
      await user.save();
      return res.status(400).json({ success: false, message: `Incorrect verification code. ${5 - attempts} attempts remaining.` });
    }

    // Mark user verified
    user.verified = true;
    user.otp = null;
    user.otp_expires_at = null;
    user.otp_attempts = 0;
    user.updated_at = new Date();
    await user.save();

    // Check if user already has an organization membership
    const memberCheck = await OrganizationMember.findOne({ user_id: user._id });
    
    let activeOrgId;
    let activeOrgName;
    let userRole = 'owner';

    if (!memberCheck) {
      // Check if user joined via corporate referral
      if (orgContext && orgContext.targetOrgId) {
        activeOrgId = orgContext.targetOrgId;
        activeOrgName = orgContext.targetOrgName;
        userRole = 'member';

        // Add member to company organization
        await OrganizationMember.create({
          organization_id: activeOrgId,
          user_id: user._id,
          role: 'member',
          status: 'active',
          can_create_api_keys: false
        });

        // Record audit log
        try {
          await AuditLog.create({
            organization_id: activeOrgId,
            actor_id: user._id,
            action: 'MEMBER_JOINED_VIA_REFERRAL',
            details: { email: user.email, name: user.name }
          });
        } catch (auditErr) {
          console.warn('Audit log write error (non-fatal):', auditErr.message);
        }
      } else {
        // Create Personal Organization for individual developer
        const initialOrgName = orgContext?.preferredOrgName?.trim() || `${user.name}'s Space`;
        const slug = `${initialOrgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${crypto.randomBytes(3).toString('hex')}`;
        const refCode = generateReferralCode();

        const org = await Organization.create({
          name: initialOrgName,
          slug,
          referral_code: refCode,
          referral_enabled: true
        });

        activeOrgId = org._id;
        activeOrgName = org.name;

        // Assign user as Owner in organization_members
        await OrganizationMember.create({
          organization_id: activeOrgId,
          user_id: user._id,
          role: 'owner',
          status: 'active',
          can_create_api_keys: true
        });

        // Create Default Workspace
        const defaultWs = await Workspace.create({
          organization_id: activeOrgId,
          name: 'Default Workspace',
          is_default: true
        });

        // Initialize Organization Budget ($100.00 default)
        await OrganizationBudget.create({
          organization_id: activeOrgId,
          monthly_budget_usd: 100.00,
          alert_threshold_percent: 80,
          hard_limit_enabled: true
        });

        // Auto-provision initial master API key for owner
        try {
          await keyService.createKey({
            organizationId: activeOrgId,
            userId: user._id,
            name: 'Default Master Key',
            workspaceId: defaultWs._id
          });
        } catch (keyErr) {
          console.warn('Initial key provisioning error (non-fatal):', keyErr.message);
        }
      }
    } else {
      const org = await Organization.findById(memberCheck.organization_id).lean();
      if (org) {
        activeOrgId = org._id;
        activeOrgName = org.name;
        userRole = memberCheck.role;
      }
    }

    // Generate JWT Session Token
    const token = generateToken(user._id);

    // Set secure cookie
    res.cookie('unillm_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.cookie('unillm_logged_in', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    console.log(`⚡ [UniLLM Auth Sandbox] Verification success for ${user.email} (Org: ${activeOrgName})`);

    return res.json({
      success: true,
      message: 'Account verified successfully.',
      user: formatPublicUser(user, activeOrgName, userRole, activeOrgId)
    });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    return res.status(500).json({ success: false, message: 'Database error during OTP verification.' });
  }
});

// 2b. Dedicated Resend OTP Endpoint
app.post('/api/auth/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found with this email.' });
    }

    const otp = generateSecureOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otp_expires_at = otpExpiresAt;
    user.otp_attempts = 0;
    user.updated_at = new Date();
    await user.save();

    if (process.env.NODE_ENV !== 'production') {
      console.log(`==================================================`);
      console.log(`⚡ [UniLLM Auth Sandbox] Resend OTP Generated`);
      console.log(`👉 User: ${user.name} (${trimmedEmail})`);
      console.log(`👉 Verification Code: ${otp}`);
      console.log(`==================================================`);
    }

    return res.json({
      success: true,
      message: 'Verification code resent successfully.',
      ...(isTestOtpExposureAllowed(req) ? { otp } : {})
    });
  } catch (err) {
    console.error('Resend OTP Error:', err);
    return res.status(500).json({ success: false, message: 'Database error during code regeneration.' });
  }
});

// 3. Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Query user and their primary organization
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found with this email.' });
    }

    // Verify Password
    if (!verifyPassword(password, user.password_hash)) {
      return res.status(400).json({ success: false, message: 'Incorrect password.' });
    }

    // If account is not verified, generate new OTP (crypto-secure)
    if (!user.verified) {
      const otp = generateSecureOtp();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otp_expires_at = otpExpiresAt;
      user.otp_attempts = 0;
      user.updated_at = new Date();
      await user.save();

      if (process.env.NODE_ENV !== 'production') {
        console.log(`==================================================`);
        console.log(`⚡ [UniLLM Auth Sandbox] Login OTP Generated (Unverified User)`);
        console.log(`👉 User: ${user.name} (${trimmedEmail})`);
        console.log(`👉 Verification Code: ${otp}`);
        console.log(`==================================================`);
      }

      return res.status(400).json({
        success: false,
        requireOtp: true,
        message: 'Account not verified. Verification code has been sent.',
        ...(isTestOtpExposureAllowed(req) ? { otp } : {})
      });
    }

    const member = await OrganizationMember.findOne({ user_id: user._id }).lean();
    if (member && member.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your organization access is suspended. Contact admin.' });
    }

    const org = member ? await Organization.findById(member.organization_id).lean() : null;

    // Generate JWT Token
    const token = generateToken(user._id);

    res.cookie('unillm_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.cookie('unillm_logged_in', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: 'Logged in successfully.',
      user: formatPublicUser(user, org?.name || 'Personal Space', member?.role || 'Owner', org?._id)
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ success: false, message: 'Database error during login.' });
  }
});

// 3b. Logout Endpoint (Clears httpOnly Cookie)
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('unillm_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.clearCookie('unillm_logged_in', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// 4. Get Current User Session (Protected Endpoint)
app.get('/api/auth/me', authenticateUser, async (req, res) => {
  return res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      org: req.user.orgName,
      role: req.user.role,
      organizationId: req.user.organizationId,
      canCreateApiKeys: req.user.canCreateApiKeys
    }
  });
});

// 4b. Update User Profile & Organization Name
app.put('/api/auth/profile', authenticateUser, async (req, res) => {
  try {
    const { name, orgName } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (name && typeof name === 'string' && name.trim()) {
      user.name = name.trim();
      user.updated_at = new Date();
      await user.save();
    }

    let updatedOrgName = req.user.orgName;
    if (orgName && typeof orgName === 'string' && orgName.trim() && req.user.organizationId) {
      const org = await Organization.findById(req.user.organizationId);
      if (org) {
        org.name = orgName.trim();
        org.updated_at = new Date();
        await org.save();
        updatedOrgName = org.name;
      }
    }

    const updatedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      org: updatedOrgName,
      role: req.user.role,
      organizationId: req.user.organizationId,
      canCreateApiKeys: req.user.canCreateApiKeys
    };

    return res.json({
      success: true,
      message: 'Profile and organization updated successfully.',
      user: updatedUser
    });
  } catch (err) {
    console.error('Update Profile Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

// 5. Password Reset Request Endpoint
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Email address is not registered.' });
    }

    const otp = generateSecureOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otp_expires_at = otpExpiresAt;
    user.otp_attempts = 0;
    user.updated_at = new Date();
    await user.save();

      if (process.env.NODE_ENV !== 'production') {
        console.log(`==================================================`);
        console.log(`⚡ [UniLLM Auth Sandbox] Password Reset OTP Generated`);
        console.log(`👉 User: ${user.name} (${trimmedEmail})`);
        console.log(`👉 Recovery Code: ${otp}`);
        console.log(`==================================================`);
      }

    return res.json({
      success: true,
      message: 'Password recovery OTP generated.',
      ...(isTestOtpExposureAllowed(req) ? { otp } : {})
    });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    return res.status(500).json({ success: false, message: 'Database error during password recovery.' });
  }
});

// 6. Complete Password Reset Endpoint
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password || typeof email !== 'string' || typeof otp !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    if (!user.otp || !user.otp_expires_at) {
      return res.status(400).json({ success: false, message: 'No active recovery session found.' });
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ success: false, message: 'Recovery code expired.' });
    }

    const attempts = (user.otp_attempts || 0) + 1;

    if (user.otp !== otp.trim()) {
      if (attempts >= 5) {
        user.otp = null;
        user.otp_expires_at = null;
        user.otp_attempts = 0;
        await user.save();
        return res.status(400).json({ success: false, message: 'Too many incorrect attempts. Recovery session invalidated.' });
      }
      user.otp_attempts = attempts;
      await user.save();
      return res.status(400).json({ success: false, message: `Incorrect recovery code. ${5 - attempts} attempts remaining.` });
    }

    // Update password hash and mark verified
    const passHash = hashPassword(password);
    user.password_hash = passHash;
    user.verified = true;
    user.otp = null;
    user.otp_expires_at = null;
    user.otp_attempts = 0;
    user.updated_at = new Date();
    await user.save();

    console.log(`⚡ [UniLLM Auth Sandbox] Password reset success for ${trimmedEmail}`);

    return res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    return res.status(500).json({ success: false, message: 'Database error during password reset.' });
  }
});

// ============================================================================
// ORGANIZATION & REFERRAL MANAGEMENT ENDPOINTS
// ============================================================================

app.get('/api/org/referral', authenticateUser, async (req, res) => {
  try {
    const org = await Organization.findById(req.user.organizationId).lean();
    if (!org) {
      return res.status(404).json({ success: false, message: 'Organization not found.' });
    }

    // Fetch joined members
    const members = await OrganizationMember.find({
      organization_id: org._id,
      role: 'member'
    }).sort({ joined_at: -1 }).lean();

    const userIds = members.map(m => m.user_id);
    const users = await User.find({ _id: { $in: userIds } }).lean();
    const userMap = new Map(users.map(u => [u._id, u]));

    const joins = members.map(m => {
      const u = userMap.get(m.user_id) || {};
      return {
        id: m.user_id,
        name: u.name || 'Member',
        email: u.email || '',
        joinedAt: m.joined_at
      };
    });

    return res.json({
      success: true,
      referral: {
        orgName: org.name,
        code: org.referral_code,
        enabled: org.referral_enabled !== false,
        joins
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch referral settings.' });
  }
});

app.post('/api/org/referral/regenerate', authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== 'owner' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin permission required.' });
    }

    const newCode = generateReferralCode();
    await Organization.updateOne(
      { _id: req.user.organizationId },
      { $set: { referral_code: newCode } }
    );

    return res.json({ success: true, referral: { code: newCode, enabled: true } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to regenerate referral code.' });
  }
});

app.post('/api/org/referral/toggle', authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== 'owner' && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin permission required.' });
    }

    const isEnabled = Boolean(req.body.enabled);
    await Organization.updateOne(
      { _id: req.user.organizationId },
      { $set: { referral_enabled: isEnabled } }
    );

    return res.json({ success: true, enabled: isEnabled });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update referral status.' });
  }
});

// API 404 Handler for undefined /api routes (returns standard JSON error)
app.all('/api/*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: `API endpoint '${req.method} ${req.path}' not found.`
  });
});

// Single-Page Application (SPA) HTML fallback
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Centralized JSON Error Handler for Express
app.use((err, req, res, next) => {
  console.error('[Server Error Handler]:', err.message);
  const statusCode = err.status || err.statusCode || 500;
  return res.status(statusCode).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
      type: 'api_error'
    }
  });
});

// Startup Server with Database Connection Ready Guarantee
const startServer = async () => {
  try {
    await connectMongo();
    initRealtimeServer(server);
    server.listen(PORT, () => {
      console.log(`==================================================`);
      console.log(`⚡ UniLLM Gateway Server Listening on Port ${PORT}`);
      console.log(`👉 Access client platform at: http://localhost:${PORT}`);
      console.log(`👉 Database: MongoDB + Mongoose (Local: mongodb://127.0.0.1:27017/unillm)`);
      console.log(`👉 Real-Time: Socket.io Enabled (Instance-Local)`);
      console.log(`==================================================`);
    });
  } catch (err) {
    console.error('❌ [FATAL] Failed to initialize database connection. Server not started:', err.message);
    process.exit(1);
  }
};

startServer();
