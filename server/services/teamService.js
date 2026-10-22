import { query } from '../config/db.js';

export const teamService = {
  /**
   * Lists all members belonging to an organization
   */
  listMembers: async (organizationId) => {
    const res = await query(`
      SELECT 
        om.id as member_id,
        om.role,
        om.status,
        om.monthly_spend_limit_usd,
        om.monthly_token_limit,
        om.can_create_api_keys,
        om.joined_at as created_at,
        u.id as user_id,
        u.name,
        u.email,
        COALESCE(SUM(r.cost_usd), 0)::DECIMAL(10,6) as current_spend,
        COUNT(r.id)::INTEGER as request_count
      FROM organization_members om
      JOIN users u ON om.user_id = u.id
      LEFT JOIN ai_requests r ON (om.organization_id = r.organization_id AND om.user_id = r.user_id)
      WHERE om.organization_id = $1
      GROUP BY om.id, om.role, om.status, om.monthly_spend_limit_usd, om.monthly_token_limit, om.can_create_api_keys, om.joined_at, u.id, u.name, u.email
      ORDER BY om.joined_at ASC;
    `, [organizationId]);

    return res.rows.map(r => ({
      memberId: r.member_id,
      userId: r.user_id,
      name: r.name,
      email: r.email,
      role: r.role,
      status: r.status,
      monthlySpendLimitUsd: r.monthly_spend_limit_usd ? parseFloat(r.monthly_spend_limit_usd) : null,
      monthlyTokenLimit: r.monthly_token_limit,
      canCreateApiKeys: r.can_create_api_keys,
      currentSpend: parseFloat(r.current_spend) || 0,
      requestCount: r.request_count || 0,
      createdAt: r.created_at
    }));
  },

  /**
   * Invites or adds a member to the organization
   */
  inviteMember: async ({ organizationId, inviterUserId, email, name, role = 'developer', monthlySpendLimitUsd = 50.00, monthlyTokenLimit = 500000 }) => {
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check if user already exists in users table, else create user stub
    let userRes = await query('SELECT id, name, email FROM users WHERE email = $1 LIMIT 1;', [normalizedEmail]);
    let targetUserId;

    if (userRes.rows.length === 0) {
      // Create user record for invited member
      const newUser = await query(`
        INSERT INTO users (email, name, password_hash)
        VALUES ($1, $2, 'INVITED_PENDING_PASSWORD')
        RETURNING id, name, email;
      `, [normalizedEmail, name || normalizedEmail.split('@')[0]]);
      targetUserId = newUser.rows[0].id;
    } else {
      targetUserId = userRes.rows[0].id;
    }

    // 2. Check if already a member of this organization
    const existingMember = await query(`
      SELECT id FROM organization_members
      WHERE organization_id = $1 AND user_id = $2
      LIMIT 1;
    `, [organizationId, targetUserId]);

    if (existingMember.rows.length > 0) {
      const err = new Error('This user is already a member of your organization.');
      err.statusCode = 400;
      throw err;
    }

    // 3. Insert into organization_members
    const memberRes = await query(`
      INSERT INTO organization_members (
        organization_id, user_id, role, status,
        monthly_spend_limit_usd, monthly_token_limit, can_create_api_keys
      )
      VALUES ($1, $2, $3, 'active', $4, $5, $6)
      RETURNING id, role, status, monthly_spend_limit_usd, monthly_token_limit, can_create_api_keys, joined_at;
    `, [
      organizationId,
      targetUserId,
      role || 'developer',
      monthlySpendLimitUsd || 50.00,
      monthlyTokenLimit || 500000,
      role === 'owner' || role === 'admin' || role === 'developer'
    ]);

    // 4. Record audit log
    await query(`
      INSERT INTO audit_logs (organization_id, actor_id, action, details)
      VALUES ($1, $2, 'member.invite', $3);
    `, [organizationId, inviterUserId, JSON.stringify({ email: normalizedEmail, role, memberId: memberRes.rows[0].id })]);

    return {
      memberId: memberRes.rows[0].id,
      userId: targetUserId,
      email: normalizedEmail,
      name: name || normalizedEmail.split('@')[0],
      role: memberRes.rows[0].role,
      status: memberRes.rows[0].status,
      monthlySpendLimitUsd: parseFloat(memberRes.rows[0].monthly_spend_limit_usd),
      monthlyTokenLimit: memberRes.rows[0].monthly_token_limit,
      createdAt: memberRes.rows[0].joined_at
    };
  },

  /**
   * Updates a member's role or status (e.g. suspend)
   */
  updateMember: async ({ organizationId, updaterUserId, memberId, role, status, monthlySpendLimitUsd }) => {
    const fields = [];
    const values = [];
    let idx = 1;

    if (role) {
      fields.push(`role = $${idx++}`);
      values.push(role);
    }
    if (status) {
      fields.push(`status = $${idx++}`);
      values.push(status);
    }
    if (typeof monthlySpendLimitUsd === 'number') {
      fields.push(`monthly_spend_limit_usd = $${idx++}`);
      values.push(monthlySpendLimitUsd);
    }

    if (fields.length === 0) return null;

    values.push(memberId);
    values.push(organizationId);

    const res = await query(`
      UPDATE organization_members
      SET ${fields.join(', ')}
      WHERE id = $${idx++} AND organization_id = $${idx++}
      RETURNING id, role, status, monthly_spend_limit_usd;
    `, values);

    if (res.rows.length === 0) {
      const err = new Error('Member not found in your organization.');
      err.statusCode = 404;
      throw err;
    }

    // Audit log
    await query(`
      INSERT INTO audit_logs (organization_id, actor_id, action, details)
      VALUES ($1, $2, 'member.update', $3);
    `, [organizationId, updaterUserId, JSON.stringify({ memberId, role, status, monthlySpendLimitUsd })]);

    return res.rows[0];
  },

  /**
   * Removes a member from an organization
   */
  removeMember: async ({ organizationId, removerUserId, memberId }) => {
    // Prevent removing the primary owner
    const memberRes = await query(`
      SELECT role FROM organization_members
      WHERE id = $1 AND organization_id = $2
      LIMIT 1;
    `, [memberId, organizationId]);

    if (memberRes.rows.length === 0) {
      const err = new Error('Member not found.');
      err.statusCode = 404;
      throw err;
    }

    if (memberRes.rows[0].role === 'owner') {
      const err = new Error('Cannot remove the organization owner.');
      err.statusCode = 400;
      throw err;
    }

    await query('DELETE FROM organization_members WHERE id = $1 AND organization_id = $2;', [memberId, organizationId]);

    // Audit log
    await query(`
      INSERT INTO audit_logs (organization_id, actor_id, action, details)
      VALUES ($1, $2, 'member.remove', $3);
    `, [organizationId, removerUserId, JSON.stringify({ memberId })]);

    return { success: true };
  }
};
