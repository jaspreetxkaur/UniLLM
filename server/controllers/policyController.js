import { policyService } from '../services/policyService.js';
import { policyValidator } from '../utils/policyValidator.js';

export const policyController = {
  /**
   * GET /api/policies - List policies for authenticated user's organization
   */
  getPolicies: async (req, res) => {
    try {
      let organizationId = req.user.organizationId;
      if (!organizationId) {
        const { OrganizationMember, Organization } = await import('../models/index.js');
        const member = await OrganizationMember.findOne({ user_id: req.user.id }).lean();
        if (member) {
          organizationId = member.organization_id;
        } else {
          const org = await Organization.findOne().lean();
          if (org) organizationId = org._id;
        }
      }
      if (!organizationId) {
        return res.json({ success: true, policies: [] });
      }
      const policies = await policyService.getPolicies(organizationId);
      return res.json({ success: true, policies });
    } catch (err) {
      console.error('[Policy Controller Error - getPolicies]:', err);
      return res.status(500).json({ success: false, message: 'Failed to retrieve routing policies.' });
    }
  },

  /**
   * GET /api/policies/:id - Get specific policy
   */
  getPolicyById: async (req, res) => {
    try {
      let organizationId = req.user.organizationId;
      if (!organizationId) {
        const { OrganizationMember } = await import('../models/index.js');
        const member = await OrganizationMember.findOne({ user_id: req.user.id }).lean();
        if (member) organizationId = member.organization_id;
      }
      const { id } = req.params;
      const policy = await policyService.getPolicyById(organizationId, id);
      if (!policy) {
        return res.status(404).json({ success: false, message: 'Routing policy not found.' });
      }
      return res.json({ success: true, policy });
    } catch (err) {
      console.error('[Policy Controller Error - getPolicyById]:', err);
      return res.status(500).json({ success: false, message: 'Failed to retrieve routing policy.' });
    }
  },

  /**
   * POST /api/policies - Create new policy
   */
  createPolicy: async (req, res) => {
    try {
      let organizationId = req.user.organizationId;
      if (!organizationId) {
        const { OrganizationMember, Organization } = await import('../models/index.js');
        const member = await OrganizationMember.findOne({ user_id: req.user.id }).lean();
        if (member) {
          organizationId = member.organization_id;
        } else {
          let org = await Organization.findOne().lean();
          if (!org) {
            org = await Organization.create({
              name: 'Cyberdyne Systems',
              slug: 'cyberdyne-systems',
              referral_code: 'CYBER-PROMO'
            });
          }
          organizationId = org._id;
          await OrganizationMember.create({
            organization_id: organizationId,
            user_id: req.user.id,
            role: 'owner',
            status: 'active'
          });
        }
        req.user.organizationId = organizationId;
      }
      const userId = req.user.id;
      const ipAddress = req.ip || req.connection.remoteAddress;

      const validation = policyValidator.validate(req.body, false);
      if (!validation.valid) {
        return res.status(400).json({ success: false, message: validation.message });
      }

      const created = await policyService.createPolicy(organizationId, userId, req.body, ipAddress);
      return res.status(201).json({ success: true, message: 'Routing policy created successfully.', policy: created });
    } catch (err) {
      console.error('[Policy Controller Error - createPolicy]:', err);
      return res.status(500).json({ success: false, message: err.message || 'Failed to create routing policy.' });
    }
  },

  /**
   * PUT /api/policies/:id - Update existing policy
   */
  updatePolicy: async (req, res) => {
    try {
      const organizationId = req.user.organizationId;
      const userId = req.user.id;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const { id } = req.params;

      const validation = policyValidator.validate(req.body, true);
      if (!validation.valid) {
        return res.status(400).json({ success: false, message: validation.message });
      }

      const updated = await policyService.updatePolicy(organizationId, id, userId, req.body, ipAddress);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Routing policy not found.' });
      }

      return res.json({ success: true, message: 'Routing policy updated successfully.', policy: updated });
    } catch (err) {
      console.error('[Policy Controller Error - updatePolicy]:', err);
      return res.status(500).json({ success: false, message: 'Failed to update routing policy.' });
    }
  },

  /**
   * DELETE /api/policies/:id - Delete policy
   */
  deletePolicy: async (req, res) => {
    try {
      const organizationId = req.user.organizationId;
      const userId = req.user.id;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const { id } = req.params;

      const deleted = await policyService.deletePolicy(organizationId, id, userId, ipAddress);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Routing policy not found.' });
      }

      return res.json({ success: true, message: 'Routing policy deleted successfully.' });
    } catch (err) {
      console.error('[Policy Controller Error - deletePolicy]:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete routing policy.' });
    }
  },

  /**
   * POST /api/policies/:id/toggle - Toggle enabled status
   */
  togglePolicy: async (req, res) => {
    try {
      const organizationId = req.user.organizationId;
      const userId = req.user.id;
      const ipAddress = req.ip || req.connection.remoteAddress;
      const { id } = req.params;

      const toggled = await policyService.togglePolicy(organizationId, id, userId, ipAddress);
      if (!toggled) {
        return res.status(404).json({ success: false, message: 'Routing policy not found.' });
      }

      return res.json({
        success: true,
        message: `Routing policy ${toggled.enabled ? 'enabled' : 'disabled'} successfully.`,
        policy: toggled
      });
    } catch (err) {
      console.error('[Policy Controller Error - togglePolicy]:', err);
      return res.status(500).json({ success: false, message: 'Failed to toggle routing policy.' });
    }
  }
};
