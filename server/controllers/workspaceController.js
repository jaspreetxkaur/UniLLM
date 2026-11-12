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

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const workspace = await workspaceService.getWorkspaceById({
        organizationId: req.user.organizationId,
        workspaceId: id
      });
      return res.json({ success: true, workspace });
    } catch (err) {
      console.error('Get Workspace Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err.message || 'Failed to get workspace.' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const workspace = await workspaceService.updateWorkspace({
        organizationId: req.user.organizationId,
        userId: req.user.id,
        workspaceId: id,
        name
      });
      return res.json({ success: true, message: 'Workspace updated successfully.', workspace });
    } catch (err) {
      console.error('Update Workspace Error:', err);
      const statusCode = err.statusCode || 500;
      return res.status(statusCode).json({ success: false, message: err.message || 'Failed to update workspace.' });
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
