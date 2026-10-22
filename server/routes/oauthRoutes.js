import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

const router = express.Router();

/**
 * Dynamically resolves the Base URL for OAuth redirects.
 * Automatically adapts between localhost (development) and deployed production domains.
 */
const getBaseUrl = (req) => {
  if (process.env.APP_URL) {
    return process.env.APP_URL.replace(/\/$/, '');
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.get('host');
  return `${proto}://${host}`;
};

/**
 * Helper: Generates unique referral codes for new workspaces
 */
const generateReferralCode = () => {
  const token = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `EMP-${token}`;
};

/**
 * Finds or provisions an OAuth authenticated user with complete multi-tenant organization context.
 */
const provisionOAuthUser = async ({ email, name, provider, providerId }) => {
  const trimmedEmail = email.trim().toLowerCase();

  // 1. Check if user already exists
  const existingRes = await query('SELECT * FROM users WHERE email = $1;', [trimmedEmail]);
  let user;

  if (existingRes.rows.length > 0) {
    user = existingRes.rows[0];
    // Automatically verify email since provider (Google/GitHub) already authenticated ownership
    if (!user.verified) {
      await query('UPDATE users SET verified = true, updated_at = NOW() WHERE id = $1;', [user.id]);
      user.verified = true;
    }
  } else {
    // Generate secure non-guessable scrypt password hash for OAuth users
    const salt = crypto.randomBytes(16).toString('hex');
    const randomSecret = crypto.randomBytes(32).toString('hex');
    const derivedKey = crypto.scryptSync(randomSecret, salt, 64);
    const passHash = `${salt}:${derivedKey.toString('hex')}`;

    const displayName = (name || trimmedEmail.split('@')[0]).trim();
    const insertRes = await query(`
      INSERT INTO users (name, email, password_hash, verified)
      VALUES ($1, $2, $3, true)
      RETURNING id, name, email;
    `, [displayName, trimmedEmail, passHash]);

    user = insertRes.rows[0];
  }

  // 2. Ensure user has a valid organization, workspace, and budget
  const memberCheck = await query('SELECT * FROM organization_members WHERE user_id = $1;', [user.id]);

  if (memberCheck.rows.length === 0) {
    const initialOrgName = `${user.name || 'Developer'}'s Space`;
    const slug = `${initialOrgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${crypto.randomBytes(3).toString('hex')}`;
    const refCode = generateReferralCode();

    const orgRes = await query(`
      INSERT INTO organizations (name, slug, referral_code, referral_enabled)
      VALUES ($1, $2, $3, true)
      RETURNING id, name;
    `, [initialOrgName, slug, refCode]);

    const activeOrgId = orgRes.rows[0].id;

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

    // Initialize Default Budget ($100.00 USD)
    await query(`
      INSERT INTO organization_budgets (organization_id, monthly_budget_usd, alert_threshold_percent, hard_limit_enabled)
      VALUES ($1, 100.00, 80, true);
    `, [activeOrgId]);

    // Record Audit Log
    try {
      await query(`
        INSERT INTO audit_logs (organization_id, actor_id, action, details)
        VALUES ($1, $2, 'OAUTH_ONBOARDING_COMPLETED', $3);
      `, [activeOrgId, user.id, JSON.stringify({ email: user.email, provider, providerId })]);
    } catch (auditErr) {
      console.warn('OAuth audit log error (non-fatal):', auditErr.message);
    }
  }

  return user;
};

/**
 * Issues JWT httpOnly session cookie and forwards user to app dashboard
 */
const setSessionAndRedirect = (res, user) => {
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026',
    { expiresIn: '7d' }
  );

  res.cookie('unillm_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return res.redirect('/app');
};

// ============================================================================
// GOOGLE OAUTH 2.0
// ============================================================================

router.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('Google OAuth Client ID is not configured on server.');
  }

  const redirectUri = `${getBaseUrl(req)}/api/auth/oauth/google/callback`;
  const scope = encodeURIComponent('openid profile email');
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&prompt=select_account`;

  return res.redirect(googleAuthUrl);
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code, error } = req.query;
    if (error || !code) {
      console.error('Google OAuth callback error:', error);
      return res.redirect('/login?error=' + encodeURIComponent(error || 'Google authorization was cancelled.'));
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${getBaseUrl(req)}/api/auth/oauth/google/callback`;

    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('Google token exchange failed:', tokenData);
      return res.redirect('/login?error=' + encodeURIComponent(tokenData.error_description || 'Failed to exchange Google token.'));
    }

    // 2. Fetch Google User Profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const profile = await profileResponse.json();
    if (!profileResponse.ok || !profile.email) {
      console.error('Google profile fetch failed:', profile);
      return res.redirect('/login?error=' + encodeURIComponent('Could not retrieve verified email from Google account.'));
    }

    // 3. Provision or match user in database
    const user = await provisionOAuthUser({
      email: profile.email,
      name: profile.name || profile.given_name || 'Google User',
      provider: 'google',
      providerId: profile.sub
    });

    // 4. Set session cookie and redirect to dashboard
    return setSessionAndRedirect(res, user);
  } catch (err) {
    console.error('Google OAuth execution error:', err);
    return res.redirect('/login?error=' + encodeURIComponent('An unexpected error occurred during Google sign in.'));
  }
});

// ============================================================================
// GITHUB OAUTH 2.0
// ============================================================================

router.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('GitHub OAuth Client ID is not configured on server.');
  }

  const redirectUri = `${getBaseUrl(req)}/api/auth/oauth/github/callback`;
  const scope = encodeURIComponent('read:user user:email');
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;

  return res.redirect(githubAuthUrl);
});

router.get('/github/callback', async (req, res) => {
  try {
    const { code, error, error_description } = req.query;
    if (error || !code) {
      console.error('GitHub OAuth callback error:', error, error_description);
      return res.redirect('/login?error=' + encodeURIComponent(error_description || error || 'GitHub authorization was cancelled.'));
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = `${getBaseUrl(req)}/api/auth/oauth/github/callback`;

    // 1. Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri
      })
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('GitHub token exchange failed:', tokenData);
      return res.redirect('/login?error=' + encodeURIComponent(tokenData.error_description || 'Failed to exchange GitHub authorization code.'));
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch GitHub User Profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'UniLLM-Gateway-App',
        'Accept': 'application/json'
      }
    });

    const profile = await profileResponse.json();
    if (!profileResponse.ok) {
      console.error('GitHub user profile fetch failed:', profile);
      return res.redirect('/login?error=' + encodeURIComponent('Could not retrieve profile from GitHub.'));
    }

    // 3. Resolve Primary Verified Email
    let userEmail = profile.email;

    if (!userEmail) {
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': 'UniLLM-Gateway-App',
          'Accept': 'application/json'
        }
      });

      if (emailResponse.ok) {
        const emails = await emailResponse.json();
        if (Array.isArray(emails)) {
          const primaryVerified = emails.find(e => e.primary && e.verified);
          const anyVerified = emails.find(e => e.verified);
          userEmail = primaryVerified?.email || anyVerified?.email || emails[0]?.email;
        }
      }
    }

    if (!userEmail) {
      return res.redirect('/login?error=' + encodeURIComponent('No verified email address found on your GitHub account.'));
    }

    // 4. Provision or match user in database
    const user = await provisionOAuthUser({
      email: userEmail,
      name: profile.name || profile.login || 'GitHub Developer',
      provider: 'github',
      providerId: String(profile.id)
    });

    // 5. Set session cookie and redirect to dashboard
    return setSessionAndRedirect(res, user);
  } catch (err) {
    console.error('GitHub OAuth execution error:', err);
    return res.redirect('/login?error=' + encodeURIComponent('An unexpected error occurred during GitHub sign in.'));
  }
});

export default router;
