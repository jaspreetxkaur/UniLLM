import { teamService } from '../services/teamService.js';

export const teamController = {
  list: async (req, res) => {
    try {
      const members = await teamService.listMembers(req.user.organizationId);
      return res.json({ success: true, members });
    } catch (err) {
      console.error('List Members Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to list team members.' });
    }
  },

  invite: async (req, res) => {
    try {
      const { email, name, role, monthlySpendLimitUsd, monthlyTokenLimit } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required to invite member.' });
      }

      const member = await teamService.inviteMember({
        organizationId: req.user.organizationId,
        inviterUserId: req.user.id,
        email,
        name,
        role,
        monthlySpendLimitUsd: typeof monthlySpendLimitUsd === 'number' ? monthlySpendLimitUsd : 50.00,
        monthlyTokenLimit: typeof monthlyTokenLimit === 'number' ? monthlyTokenLimit : 500000
      });

      return res.status(201).json({ success: true, member });
    } catch (err) {
      console.error('Invite Member Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err.message || 'Failed to invite member.' });
    }
  },

  update: async (req, res) => {
    try {
      const { memberId } = req.params;
      const { role, status, monthlySpendLimitUsd } = req.body;

      const member = await teamService.updateMember({
        organizationId: req.user.organizationId,
        updaterUserId: req.user.id,
        memberId,
        role,
        status,
        monthlySpendLimitUsd
      });

      return res.json({ success: true, member });
    } catch (err) {
      console.error('Update Member Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err.message || 'Failed to update member.' });
    }
  },

  remove: async (req, res) => {
    try {
      const { memberId } = req.params;
      await teamService.removeMember({
        organizationId: req.user.organizationId,
        removerUserId: req.user.id,
        memberId
      });

      return res.json({ success: true, message: 'Member removed successfully.' });
    } catch (err) {
      console.error('Remove Member Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err.message || 'Failed to remove member.' });
    }
  }
};
