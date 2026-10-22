import { query } from '../config/db.js';
import { auditService } from './auditService.js';

export const policyService = {
  /**
   * List all routing policies for an organization ordered deterministically
   */
  getPolicies: async (organizationId) => {
    const res = await query(`
      SELECT 
        id,
        organization_id as "organizationId",
        name,
        description,
        enabled,
        priority,
        condition_type as "conditionType",
        condition_config as "conditionConfig",
        action_type as "actionType",
        action_config as "actionConfig",
        created_by_user_id as "createdByUserId",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM routing_policies
      WHERE organization_id = $1
      ORDER BY priority ASC, created_at ASC;
    `, [organizationId]);
    return res.rows;
  },

  /**
   * Get single policy by ID scoped to organization
   */
  getPolicyById: async (organizationId, policyId) => {
    const res = await query(`
      SELECT 
        id,
        organization_id as "organizationId",
        name,
        description,
        enabled,
        priority,
        condition_type as "conditionType",
        condition_config as "conditionConfig",
        action_type as "actionType",
        action_config as "actionConfig",
        created_by_user_id as "createdByUserId",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM routing_policies
      WHERE organization_id = $1 AND id = $2;
    `, [organizationId, policyId]);
    return res.rows[0] || null;
  },

  /**
   * Create a new routing policy with audit logging
   */
  createPolicy: async (organizationId, userId, data, ipAddress = null) => {
    const {
      name,
      description = null,
      enabled = true,
      priority = 10,
      condition_type,
      condition_config = {},
      action_type,
      action_config = {}
    } = data;

    const res = await query(`
      INSERT INTO routing_policies (
        organization_id, name, description, enabled, priority,
        condition_type, condition_config, action_type, action_config,
        created_by_user_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING 
        id, organization_id as "organizationId", name, description, enabled, priority,
        condition_type as "conditionType", condition_config as "conditionConfig",
        action_type as "actionType", action_config as "actionConfig",
        created_at as "createdAt", updated_at as "updatedAt";
    `, [
      organizationId,
      name.trim(),
      description ? description.trim() : null,
      enabled,
      priority,
      condition_type,
      JSON.stringify(condition_config),
      action_type,
      JSON.stringify(action_config),
      userId
    ]);

    const createdPolicy = res.rows[0];

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.create',
      details: { policyId: createdPolicy.id, name: createdPolicy.name, priority, condition_type, action_type },
      ipAddress
    });

    return createdPolicy;
  },

  /**
   * Update an existing routing policy with audit logging
   */
  updatePolicy: async (organizationId, policyId, userId, data, ipAddress = null) => {
    const existing = await policyService.getPolicyById(organizationId, policyId);
    if (!existing) {
      return null;
    }

    const name = data.name !== undefined ? data.name.trim() : existing.name;
    const description = data.description !== undefined ? (data.description ? data.description.trim() : null) : existing.description;
    const enabled = data.enabled !== undefined ? data.enabled : existing.enabled;
    const priority = data.priority !== undefined ? data.priority : existing.priority;
    const condition_type = data.condition_type !== undefined ? data.condition_type : existing.conditionType;
    const condition_config = data.condition_config !== undefined ? data.condition_config : existing.conditionConfig;
    const action_type = data.action_type !== undefined ? data.action_type : existing.actionType;
    const action_config = data.action_config !== undefined ? data.action_config : existing.actionConfig;

    const res = await query(`
      UPDATE routing_policies
      SET 
        name = $1,
        description = $2,
        enabled = $3,
        priority = $4,
        condition_type = $5,
        condition_config = $6,
        action_type = $7,
        action_config = $8,
        updated_at = NOW()
      WHERE organization_id = $9 AND id = $10
      RETURNING 
        id, organization_id as "organizationId", name, description, enabled, priority,
        condition_type as "conditionType", condition_config as "conditionConfig",
        action_type as "actionType", action_config as "actionConfig",
        created_at as "createdAt", updated_at as "updatedAt";
    `, [
      name,
      description,
      enabled,
      priority,
      condition_type,
      JSON.stringify(condition_config),
      action_type,
      JSON.stringify(action_config),
      organizationId,
      policyId
    ]);

    const updated = res.rows[0];

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.update',
      details: { policyId, name: updated.name, changes: data },
      ipAddress
    });

    return updated;
  },

  /**
   * Delete a routing policy with audit logging
   */
  deletePolicy: async (organizationId, policyId, userId, ipAddress = null) => {
    const existing = await policyService.getPolicyById(organizationId, policyId);
    if (!existing) {
      return false;
    }

    await query(`
      DELETE FROM routing_policies
      WHERE organization_id = $1 AND id = $2;
    `, [organizationId, policyId]);

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.delete',
      details: { policyId, name: existing.name },
      ipAddress
    });

    return true;
  },

  /**
   * Toggle enabled/disabled status of a policy
   */
  togglePolicy: async (organizationId, policyId, userId, ipAddress = null) => {
    const existing = await policyService.getPolicyById(organizationId, policyId);
    if (!existing) {
      return null;
    }

    const nextEnabled = !existing.enabled;

    const res = await query(`
      UPDATE routing_policies
      SET enabled = $1, updated_at = NOW()
      WHERE organization_id = $2 AND id = $3
      RETURNING 
        id, organization_id as "organizationId", name, description, enabled, priority,
        condition_type as "conditionType", condition_config as "conditionConfig",
        action_type as "actionType", action_config as "actionConfig",
        created_at as "createdAt", updated_at as "updatedAt";
    `, [nextEnabled, organizationId, policyId]);

    const updated = res.rows[0];

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.toggle',
      details: { policyId, name: existing.name, enabled: nextEnabled },
      ipAddress
    });

    return updated;
  }
};
