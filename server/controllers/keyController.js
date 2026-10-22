import { keyService } from '../services/keyService.js';

export const keyController = {
  create: async (req, res) => {
    try {
      const { name, workspaceId } = req.body;
      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Key name / label is required.' });
      }

      if (!req.user.canCreateApiKeys && req.user.role === 'member') {
        return res.status(403).json({ success: false, message: 'You do not have permission to create API keys in this organization.' });
      }

      const result = await keyService.createKey({
        organizationId: req.user.organizationId,
        userId: req.user.id,
        name: name.trim(),
        workspaceId
      });

      return res.status(201).json({
        success: true,
        message: 'API Key generated successfully. Save this secret key immediately as it will not be displayed again.',
        key: result
      });
    } catch (err) {
      console.error('Create API Key Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to generate API key.' });
    }
  },

  list: async (req, res) => {
    try {
      const { workspaceId } = req.query;
      const keys = await keyService.listKeys(req.user.organizationId, workspaceId);
      return res.json({
        success: true,
        keys
      });
    } catch (err) {
      console.error('List API Keys Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch API keys.' });
    }
  },

  revoke: async (req, res) => {
    try {
      const keyId = req.params.id;
      if (!keyId) {
        return res.status(400).json({ success: false, message: 'Key ID parameter required.' });
      }

      const result = await keyService.revokeKey(req.user.organizationId, keyId, req.user.id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'API key not found or does not belong to your organization.' });
      }

      return res.json({
        success: true,
        message: `API Key '${result.name}' (${result.key_prefix}) has been revoked.`
      });
    } catch (err) {
      console.error('Revoke API Key Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to revoke API key.' });
    }
  }
};
