import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

export const authenticateUser = async (req, res, next) => {
  try {
    let token = null;

    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.unillm_token) {
      token = req.cookies.unillm_token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required. No session token provided.' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026');
    
    // Fetch user and organization context from PostgreSQL
    const userRes = await query(`
      SELECT 
        u.id, u.name, u.email, u.verified,
        om.organization_id, om.role, om.status as member_status,
        om.monthly_token_limit, om.monthly_spend_limit_usd, om.can_create_api_keys,
        o.name as org_name, o.slug as org_slug
      FROM users u
      LEFT JOIN organization_members om ON u.id = om.user_id
      LEFT JOIN organizations o ON om.organization_id = o.id
      WHERE u.id = $1
      LIMIT 1;
    `, [decoded.userId]);

    if (userRes.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'User account not found.' });
    }

    const user = userRes.rows[0];

    if (user.member_status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended by the organization administrator.' });
    }

    // Attach to request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      organizationId: user.organization_id,
      orgName: user.org_name || 'Personal Space',
      role: user.role || 'owner',
      canCreateApiKeys: user.can_create_api_keys !== false,
      monthlyTokenLimit: user.monthly_token_limit,
      monthlySpendLimitUsd: user.monthly_spend_limit_usd
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};
