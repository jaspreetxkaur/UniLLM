import { OrganizationMember, User, AiRequest, AuditLog } from '../models/index.js';

export const teamService = {
  /**
   * Lists all members belonging to an organization
   */
  listMembers: async (organizationId) => {
    const members = await OrganizationMember.find({ organization_id: organizationId })
      .sort({ joined_at: 1 })
      .lean();

    if (members.length === 0) return [];

    const userIds = [...new Set(members.map(m => m.user_id).filter(Boolean))];
    const users = await User.find({ _id: { $in: userIds } }).lean();
    const userMap = new Map(users.map(u => [u._id, u]));

    // Aggregate spend and request counts per user
    const reqAgg = await AiRequest.aggregate([
      { $match: { organization_id: organizationId } },
      {
        $group: {
          _id: '$user_id',
          currentSpend: { $sum: '$cost_usd' },
          requestCount: { $sum: 1 }
        }
      }
    ]);
    const reqMap = new Map(reqAgg.map(r => [r._id, { currentSpend: r.currentSpend, count: r.requestCount }]));

    return members.map(m => {
      const u = userMap.get(m.user_id) || {};
      const stats = reqMap.get(m.user_id) || { currentSpend: 0, count: 0 };

      return {
        memberId: m._id,
        userId: m.user_id,
        name: u.name || 'Member',
        email: u.email || '',
        role: m.role,
        status: m.status,
        monthlySpendLimitUsd: m.monthly_spend_limit_usd !== null ? parseFloat(m.monthly_spend_limit_usd) : null,
        monthlyTokenLimit: m.monthly_token_limit,
        canCreateApiKeys: m.can_create_api_keys !== false,
        currentSpend: parseFloat((stats.currentSpend || 0).toFixed(6)),
        requestCount: stats.count || 0,
        createdAt: m.joined_at
      };
    });
  },

  /**
   * Invites or adds a member to the organization
   */
  inviteMember: async ({
    organizationId,
    inviterUserId,
    email,
    name,
    role = 'developer',
    monthlySpendLimitUsd = 50.00,
    monthlyTokenLimit = 500000
  }) => {
    if (!email || typeof email !== 'string' || !email.trim()) {
      const err = new Error('Valid email address is required.');
      err.statusCode = 400;
      throw err;
    }
    const cleanRole = (typeof role === 'string' && ['owner', 'admin', 'member', 'developer'].includes(role.toLowerCase()))
      ? role.toLowerCase()
      : 'developer';
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check if user already exists in users, else create user stub
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      user = await User.create({
        email: normalizedEmail,
        name: name || normalizedEmail.split('@')[0],
        password_hash: 'INVITED_PENDING_PASSWORD'
      });
    }

    // 2. Check if already a member of this organization
    const existing = await OrganizationMember.findOne({
      organization_id: organizationId,
      user_id: user._id
    }).lean();

    if (existing) {
      const err = new Error('This user is already a member of your organization.');
      err.statusCode = 400;
      throw err;
    }

    // 3. Create organization member
    const member = await OrganizationMember.create({
      organization_id: organizationId,
      user_id: user._id,
      role: cleanRole,
      status: 'active',
      monthly_spend_limit_usd: monthlySpendLimitUsd || 50.00,
      monthly_token_limit: monthlyTokenLimit || 500000,
      can_create_api_keys: cleanRole === 'owner' || cleanRole === 'admin' || cleanRole === 'developer'
    });

    // 4. Record audit log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: inviterUserId,
        action: 'member.invite',
        details: { email: normalizedEmail, role, memberId: member._id }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    return {
      memberId: member._id,
      userId: user._id,
      email: normalizedEmail,
      name: user.name,
      role: member.role,
      status: member.status,
      monthlySpendLimitUsd: parseFloat(member.monthly_spend_limit_usd),
      monthlyTokenLimit: member.monthly_token_limit,
      createdAt: member.joined_at
    };
  },

  /**
   * Updates a member's role or status (e.g. suspend)
   */
  updateMember: async ({ organizationId, updaterUserId, memberId, role, status, monthlySpendLimitUsd }) => {
    if (!memberId || typeof memberId !== 'string') {
      const err = new Error('Valid member ID is required.');
      err.statusCode = 400;
      throw err;
    }

    const update = {};
    if (role && typeof role === 'string' && ['owner', 'admin', 'member', 'developer'].includes(role.toLowerCase())) {
      update.role = role.toLowerCase();
    }
    if (status && typeof status === 'string' && ['active', 'suspended', 'invited'].includes(status.toLowerCase())) {
      update.status = status.toLowerCase();
    }
    if (typeof monthlySpendLimitUsd === 'number' && !isNaN(monthlySpendLimitUsd) && monthlySpendLimitUsd >= 0) {
      update.monthly_spend_limit_usd = monthlySpendLimitUsd;
    }

    if (Object.keys(update).length === 0) return null;

    const member = await OrganizationMember.findOneAndUpdate(
      { _id: memberId, organization_id: organizationId },
      { $set: update },
      { returnDocument: 'after' }
    ).lean();

    if (!member) {
      const err = new Error('Member not found in your organization.');
      err.statusCode = 404;
      throw err;
    }

    // Audit log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: updaterUserId,
        action: 'member.update',
        details: { memberId, role, status, monthlySpendLimitUsd }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    return {
      id: member._id,
      role: member.role,
      status: member.status,
      monthly_spend_limit_usd: member.monthly_spend_limit_usd
    };
  },

  /**
   * Removes a member from an organization
   */
  removeMember: async ({ organizationId, removerUserId, memberId }) => {
    if (!memberId || typeof memberId !== 'string') {
      const err = new Error('Valid member ID is required.');
      err.statusCode = 400;
      throw err;
    }

    const member = await OrganizationMember.findOne({
      _id: memberId,
      organization_id: organizationId
    }).lean();

    if (!member) {
      const err = new Error('Member not found.');
      err.statusCode = 404;
      throw err;
    }

    if (member.role === 'owner') {
      const err = new Error('Cannot remove the organization owner.');
      err.statusCode = 400;
      throw err;
    }

    await OrganizationMember.deleteOne({ _id: memberId, organization_id: organizationId });

    // Audit log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: removerUserId,
        action: 'member.remove',
        details: { memberId }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    return { success: true };
  }
};
