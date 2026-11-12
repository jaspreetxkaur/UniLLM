import { RoutingPolicy } from '../models/index.js';
import { auditService } from './auditService.js';
import { realtimeService } from '../realtime/socket.js';

const formatPolicy = (p) => ({
  id: p._id,
  organizationId: p.organization_id,
  name: p.name,
  description: p.description,
  enabled: p.enabled,
  priority: p.priority,
  conditionType: p.condition_type,
  conditionConfig: p.condition_config || {},
  actionType: p.action_type,
  actionConfig: p.action_config || {},
  createdByUserId: p.created_by_user_id,
  createdAt: p.created_at,
  updatedAt: p.updated_at
});

export const policyService = {
  /**
   * List all routing policies for an organization ordered deterministically
   */
  getPolicies: async (organizationId) => {
    const policies = await RoutingPolicy.find({ organization_id: organizationId })
      .sort({ priority: 1, created_at: 1 })
      .lean();
    return policies.map(formatPolicy);
  },

  /**
   * Get single policy by ID scoped to organization
   */
  getPolicyById: async (organizationId, policyId) => {
    if (!policyId || typeof policyId !== 'string') return null;
    const policy = await RoutingPolicy.findOne({
      organization_id: organizationId,
      _id: policyId
    }).lean();
    return policy ? formatPolicy(policy) : null;
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

    if (!name || typeof name !== 'string') {
      const err = new Error('Policy name is required.');
      err.statusCode = 400;
      throw err;
    }

    const created = await RoutingPolicy.create({
      organization_id: organizationId,
      name: name.trim(),
      description: description ? description.trim() : '',
      enabled,
      priority,
      condition_type,
      condition_config,
      action_type,
      action_config,
      created_by_user_id: userId
    });

    const formatted = formatPolicy(created);

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.create',
      details: { policyId: formatted.id, name: formatted.name, priority, condition_type, action_type },
      ipAddress
    });

    realtimeService.emitPolicyChanged(organizationId, {
      action: 'created',
      policyId: formatted.id,
      policyName: formatted.name,
      enabled: formatted.enabled,
      priority: formatted.priority
    });

    return formatted;
  },

  /**
   * Update an existing routing policy with audit logging
   */
  updatePolicy: async (organizationId, policyId, userId, data, ipAddress = null) => {
    const existing = await policyService.getPolicyById(organizationId, policyId);
    if (!existing) {
      return null;
    }

    const update = { updated_at: new Date() };
    if (data.name !== undefined) update.name = data.name.trim();
    if (data.description !== undefined) update.description = data.description ? data.description.trim() : '';
    if (data.enabled !== undefined) update.enabled = data.enabled;
    if (data.priority !== undefined) update.priority = data.priority;
    if (data.condition_type !== undefined) update.condition_type = data.condition_type;
    if (data.condition_config !== undefined) update.condition_config = data.condition_config;
    if (data.action_type !== undefined) update.action_type = data.action_type;
    if (data.action_config !== undefined) update.action_config = data.action_config;

    const updated = await RoutingPolicy.findOneAndUpdate(
      { organization_id: organizationId, _id: policyId },
      { $set: update },
      { returnDocument: 'after' }
    ).lean();

    const formatted = formatPolicy(updated);

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.update',
      details: { policyId, name: formatted.name, changes: data },
      ipAddress
    });

    realtimeService.emitPolicyChanged(organizationId, {
      action: 'updated',
      policyId: formatted.id,
      policyName: formatted.name,
      enabled: formatted.enabled,
      priority: formatted.priority
    });

    return formatted;
  },

  /**
   * Delete a routing policy with audit logging
   */
  deletePolicy: async (organizationId, policyId, userId, ipAddress = null) => {
    const existing = await policyService.getPolicyById(organizationId, policyId);
    if (!existing) {
      return false;
    }

    await RoutingPolicy.deleteOne({ organization_id: organizationId, _id: policyId });

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.delete',
      details: { policyId, name: existing.name },
      ipAddress
    });

    realtimeService.emitPolicyChanged(organizationId, {
      action: 'deleted',
      policyId,
      policyName: existing.name
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

    const updated = await RoutingPolicy.findOneAndUpdate(
      { organization_id: organizationId, _id: policyId },
      { $set: { enabled: nextEnabled, updated_at: new Date() } },
      { returnDocument: 'after' }
    ).lean();

    const formatted = formatPolicy(updated);

    // Record audit log
    await auditService.log({
      organizationId,
      actorId: userId,
      action: 'policy.toggle',
      details: { policyId, name: existing.name, enabled: nextEnabled },
      ipAddress
    });

    realtimeService.emitPolicyChanged(organizationId, {
      action: 'toggled',
      policyId: formatted.id,
      policyName: formatted.name,
      enabled: formatted.enabled,
      priority: formatted.priority
    });

    return formatted;
  }
};
