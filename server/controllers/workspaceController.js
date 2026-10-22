import { workspaceService } from '../services/workspaceService.js';

export const workspaceController = {
  list: async (req, res) => {
    try {
      const workspaces = await workspaceService.listWorkspaces(req.user.organizationId);
      return res.json({ success: true, workspaces });
    } catch (err) {
      console.error('List Workspaces Error:', err);
      return res.status(500).json({ success: false, message: 'Failed to list workspaces.' });
    }
  },

  create: async (req, res) => {
    try {
      const { name } = req.body;
      const workspace = await workspaceService.createWorkspace({
        organizationId: req.user.organizationId,
        userId: req.user.id,
        name
      });
      return res.status(201).json({ success: true, workspace });
    } catch (err) {
      console.error('Create Workspace Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err.message || 'Failed to create workspace.' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await workspaceService.deleteWorkspace({
        organizationId: req.user.organizationId,
        userId: req.user.id,
        workspaceId: id
      });
      return res.json({ success: true, message: 'Workspace deleted successfully.' });
    } catch (err) {
      console.error('Delete Workspace Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err.message || 'Failed to delete workspace.' });
    }
  }
};
