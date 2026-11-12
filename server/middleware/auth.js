import jwt from 'jsonwebtoken';
import { User, OrganizationMember, Organization } from '../models/index.js';

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
    
    // Fetch user from MongoDB
    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return res.status(401).json({ success: false, message: 'User account not found.' });
    }

    // Fetch primary organization membership
    const member = await OrganizationMember.findOne({ user_id: user._id }).lean();
    let org = null;
    if (member && member.organization_id) {
      org = await Organization.findById(member.organization_id).lean();
    }

    if (member && member.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended by the organization administrator.' });
    }

    // Attach to request preserving exact contract
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      organizationId: member ? member.organization_id : null,
      orgName: org ? org.name : 'Personal Space',
      role: member ? member.role : 'owner',
      canCreateApiKeys: member ? member.can_create_api_keys !== false : true,
      monthlyTokenLimit: member ? member.monthly_token_limit : null,
      monthlySpendLimitUsd: member ? member.monthly_spend_limit_usd : null
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
  }
};
