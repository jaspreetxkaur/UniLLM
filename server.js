import express from 'express';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { query } from './server/config/db.js';
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
import { authLimiter, gatewayLimiter } from './server/middleware/rateLimiter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('❌ [FATAL ERROR]: JWT_SECRET must be explicitly set in production!');
  process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026';

app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// Helper: Generate secure referral codes
const generateReferralCode = () => {
  const token = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `EMP-${token}`;
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
const formatPublicUser = (user, orgName = 'Personal Space', role = 'owner') => ({
  id: user.id,
  name: user.name,
  email: user.email,
  org: orgName,
  role: role || 'Owner'
});

// ============================================================================
// AUTHENTICATION ENDPOINTS (POSTGRESQL-BACKED)
// ============================================================================

// 1. Sign Up Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, orgName, referralCode } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingRes = await query('SELECT * FROM users WHERE email = $1;', [trimmedEmail]);
    
    // Check referral code validity if provided
    let targetOrgId = null;
    let targetOrgName = null;
    let targetRole = 'owner';
    const submittedCode = (referralCode || '').trim().toUpperCase();

    if (submittedCode) {
      const orgRes = await query('SELECT * FROM organizations WHERE referral_code = $1;', [submittedCode]);
      if (orgRes.rows.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid employee referral code.' });
      }
      if (!orgRes.rows[0].referral_enabled) {
        return res.status(400).json({ success: false, message: 'Employee referral joining is currently disabled for this organization.' });
      }
      targetOrgId = orgRes.rows[0].id;
      targetOrgName = orgRes.rows[0].name;
      targetRole = 'member';
    }

    // Generate 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry
    const passHash = hashPassword(password);

    let userId;

    if (existingRes.rows.length > 0) {
      const user = existingRes.rows[0];
      if (user.verified) {
        return res.status(400).json({ success: false, message: 'Email address is already registered and verified. Please log in.' });
      }
      
      // Update pending account with fresh OTP and password
      await query(`
        UPDATE users 
        SET name = $1, password_hash = $2, otp = $3, otp_expires_at = $4, otp_attempts = 0, updated_at = NOW()
        WHERE id = $5;
      `, [name.trim(), passHash, otp, otpExpiresAt, user.id]);
      
      userId = user.id;
    } else {
      // Create new user in PostgreSQL
      const insertRes = await query(`
        INSERT INTO users (name, email, password_hash, verified, otp, otp_expires_at, otp_attempts)
        VALUES ($1, $2, $3, false, $4, $5, 0)
        RETURNING id;
      `, [name.trim(), trimmedEmail, passHash, otp, otpExpiresAt]);
      
      userId = insertRes.rows[0].id;
    }

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
      ...(process.env.NODE_ENV !== 'production' ? { otp } : {}), // Omitted in production
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
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and verification code are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const userRes = await query('SELECT * FROM users WHERE email = $1;', [trimmedEmail]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    const user = userRes.rows[0];

    if (!user.otp || !user.otp_expires_at) {
      return res.status(400).json({ success: false, message: 'No active verification code found. Please request a new one.' });
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new code.' });
    }

    const attempts = (user.otp_attempts || 0) + 1;

    if (user.otp !== otp.trim()) {
      if (attempts >= 5) {
        await query('UPDATE users SET otp = NULL, otp_expires_at = NULL, otp_attempts = 0 WHERE id = $1;', [user.id]);
        return res.status(400).json({ success: false, message: 'Too many incorrect attempts. Verification code invalidated.' });
      }
      await query('UPDATE users SET otp_attempts = $1 WHERE id = $2;', [attempts, user.id]);
      return res.status(400).json({ success: false, message: `Incorrect verification code. ${5 - attempts} attempts remaining.` });
    }

    // Mark user verified
    await query(`
      UPDATE users 
      SET verified = true, otp = NULL, otp_expires_at = NULL, otp_attempts = 0, updated_at = NOW() 
      WHERE id = $1;
    `, [user.id]);

    // Check if user already has an organization membership
    const memberCheck = await query('SELECT * FROM organization_members WHERE user_id = $1;', [user.id]);
    
    let activeOrgId;
    let activeOrgName;
    let userRole = 'owner';

    if (memberCheck.rows.length === 0) {
      // Check if user joined via corporate referral
      if (orgContext && orgContext.targetOrgId) {
        activeOrgId = orgContext.targetOrgId;
        activeOrgName = orgContext.targetOrgName;
        userRole = 'member';

        // Add member to company organization
        await query(`
          INSERT INTO organization_members (organization_id, user_id, role, status, can_create_api_keys)
          VALUES ($1, $2, 'member', 'active', false)
          ON CONFLICT (organization_id, user_id) DO NOTHING;
        `, [activeOrgId, user.id]);

        // Record audit log
        await query(`
          INSERT INTO audit_logs (organization_id, actor_id, action, details)
          VALUES ($1, $2, 'MEMBER_JOINED_VIA_REFERRAL', $3);
        `, [activeOrgId, user.id, JSON.stringify({ email: user.email, name: user.name })]);
      } else {
        // Create Personal Organization for individual developer
        const initialOrgName = orgContext?.preferredOrgName?.trim() || `${user.name}'s Space`;
        const slug = `${initialOrgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${crypto.randomBytes(3).toString('hex')}`;
        const refCode = generateReferralCode();

        const orgRes = await query(`
          INSERT INTO organizations (name, slug, referral_code, referral_enabled)
          VALUES ($1, $2, $3, true)
          RETURNING id, name;
        `, [initialOrgName, slug, refCode]);

        activeOrgId = orgRes.rows[0].id;
        activeOrgName = orgRes.rows[0].name;

        // Assign user as Owner in organization_members
        await query(`
          INSERT INTO organization_members (organization_id, user_id, role, status, can_create_api_keys)
          VALUES ($1, $2, 'owner', 'active', true);
        `, [activeOrgId, user.id]);

        // Create Default Workspace
        await query(`
          INSERT INTO workspaces (organization_id, name, is_default)
          VALUES ($1, 'Default Workspace', true);
        `, [activeOrgId]);

        // Initialize Organization Budget ($100.00 default)
        await query(`
          INSERT INTO organization_budgets (organization_id, monthly_budget_usd, alert_threshold_percent, hard_limit_enabled)
          VALUES ($1, 100.00, 80, true);
        `, [activeOrgId]);
      }
    } else {
      const orgInfo = await query(`
        SELECT o.id, o.name, om.role 
        FROM organization_members om 
        JOIN organizations o ON om.organization_id = o.id 
        WHERE om.user_id = $1 LIMIT 1;
      `, [user.id]);
      if (orgInfo.rows.length > 0) {
        activeOrgId = orgInfo.rows[0].id;
        activeOrgName = orgInfo.rows[0].name;
        userRole = orgInfo.rows[0].role;
      }
    }

    // Generate JWT Session Token
    const token = generateToken(user.id);

    // Set secure cookie
    res.cookie('unillm_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    console.log(`⚡ [UniLLM Auth Sandbox] Verification success for ${user.email} (Org: ${activeOrgName})`);

    return res.json({
      success: true,
      message: 'Account verified successfully.',
      user: formatPublicUser(user, activeOrgName, userRole)
    });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    return res.status(500).json({ success: false, message: 'Database error during OTP verification.' });
  }
});

// 3. Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Query user and their primary organization
    const userRes = await query(`
      SELECT 
        u.*,
        om.organization_id, om.role, om.status as member_status,
        o.name as org_name
      FROM users u
      LEFT JOIN organization_members om ON u.id = om.user_id
      LEFT JOIN organizations o ON om.organization_id = o.id
      WHERE u.email = $1
      LIMIT 1;
    `, [trimmedEmail]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Account not found with this email.' });
    }

    const user = userRes.rows[0];

    // Verify Password
    if (!verifyPassword(password, user.password_hash)) {
      return res.status(400).json({ success: false, message: 'Incorrect password.' });
    }

    // If account is not verified, generate new OTP
    if (!user.verified) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await query(`
        UPDATE users 
        SET otp = $1, otp_expires_at = $2, otp_attempts = 0, updated_at = NOW() 
        WHERE id = $3;
      `, [otp, otpExpiresAt, user.id]);

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
        ...(process.env.NODE_ENV !== 'production' ? { otp } : {})
      });
    }

    if (user.member_status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your organization access is suspended. Contact admin.' });
    }

    // Generate JWT Token
    const token = generateToken(user.id);

    res.cookie('unillm_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: 'Logged in successfully.',
      user: formatPublicUser(user, user.org_name || 'Personal Space', user.role || 'Owner')
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

// 5. Password Reset Request Endpoint
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const userRes = await query('SELECT * FROM users WHERE email = $1;', [trimmedEmail]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Email address is not registered.' });
    }

    const user = userRes.rows[0];
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await query(`
      UPDATE users 
      SET otp = $1, otp_expires_at = $2, otp_attempts = 0, updated_at = NOW() 
      WHERE id = $3;
    `, [otp, otpExpiresAt, user.id]);

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
      ...(process.env.NODE_ENV !== 'production' ? { otp } : {})
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
    if (!email || !otp || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const userRes = await query('SELECT * FROM users WHERE email = $1;', [trimmedEmail]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    const user = userRes.rows[0];

    if (!user.otp || !user.otp_expires_at) {
      return res.status(400).json({ success: false, message: 'No active recovery session found.' });
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      return res.status(400).json({ success: false, message: 'Recovery code expired.' });
    }

    const attempts = (user.otp_attempts || 0) + 1;

    if (user.otp !== otp.trim()) {
      if (attempts >= 5) {
        await query('UPDATE users SET otp = NULL, otp_expires_at = NULL, otp_attempts = 0 WHERE id = $1;', [user.id]);
        return res.status(400).json({ success: false, message: 'Too many incorrect attempts. Recovery session invalidated.' });
      }
      await query('UPDATE users SET otp_attempts = $1 WHERE id = $2;', [attempts, user.id]);
      return res.status(400).json({ success: false, message: `Incorrect recovery code. ${5 - attempts} attempts remaining.` });
    }

    // Update password hash and mark verified
    const passHash = hashPassword(password);
    await query(`
      UPDATE users 
      SET password_hash = $1, verified = true, otp = NULL, otp_expires_at = NULL, otp_attempts = 0, updated_at = NOW() 
      WHERE id = $2;
    `, [passHash, user.id]);

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
    const orgRes = await query('SELECT * FROM organizations WHERE id = $1;', [req.user.organizationId]);
    if (orgRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Organization not found.' });
    }

    const org = orgRes.rows[0];

    // Fetch joined members
    const joinsRes = await query(`
      SELECT u.id, u.name, u.email, om.joined_at as "joinedAt"
      FROM organization_members om
      JOIN users u ON om.user_id = u.id
      WHERE om.organization_id = $1 AND om.role = 'member'
      ORDER BY om.joined_at DESC;
    `, [org.id]);

    return res.json({
      success: true,
      referral: {
        orgName: org.name,
        code: org.referral_code,
        enabled: org.referral_enabled,
        joins: joinsRes.rows
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
    await query('UPDATE organizations SET referral_code = $1 WHERE id = $2;', [newCode, req.user.organizationId]);

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

    const { enabled } = req.body;
    await query('UPDATE organizations SET referral_enabled = $1 WHERE id = $2;', [enabled, req.user.organizationId]);

    return res.json({ success: true, enabled });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update referral status.' });
  }
});

// Single-Page Application (SPA) HTML fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Centralized JSON Error Handler for Express
app.use((err, req, res, next) => {
  console.error('[Server Error Handler]:', err.message);
  return res.status(err.status || 500).json({
    error: {
      message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
      type: 'api_error'
    }
  });
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`⚡ UniLLM Gateway Server Listening on Port ${PORT}`);
  console.log(`👉 Access client platform at: http://localhost:${PORT}`);
  console.log(`👉 PostgreSQL Connected to Supabase`);
  console.log(`==================================================`);
});
