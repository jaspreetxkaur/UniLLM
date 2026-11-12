import fs from 'fs';
import path from 'path';
import { Workspace, ApiKey, AiRequest, AuditLog } from '../models/index.js';
import { realtimeService } from '../realtime/socket.js';

export const workspaceService = {
  /**
   * Lists all workspaces for an organization with usage aggregates
   */
  listWorkspaces: async (organizationId) => {
    const workspaces = await Workspace.find({ organization_id: organizationId })
      .sort({ is_default: -1, created_at: 1 })
      .lean();

    if (workspaces.length === 0) return [];

    // Aggregate key counts by workspace
    const keyAgg = await ApiKey.aggregate([
      { $match: { organization_id: organizationId } },
      { $group: { _id: '$workspace_id', keyCount: { $sum: 1 } } }
    ]);
    const keyMap = new Map(keyAgg.map(k => [k._id, k.keyCount]));

    // Aggregate request counts and costs by workspace
    const reqAgg = await AiRequest.aggregate([
      { $match: { organization_id: organizationId } },
      {
        $group: {
          _id: '$workspace_id',
          requestCount: { $sum: 1 },
          totalSpend: { $sum: '$cost_usd' }
        }
      }
    ]);
    const reqMap = new Map(reqAgg.map(r => [r._id, { count: r.requestCount, spend: r.totalSpend }]));

    return workspaces.map(w => {
      const stats = reqMap.get(w._id) || { count: 0, spend: 0 };
      return {
        id: w._id,
        name: w.name,
        isDefault: Boolean(w.is_default),
        keyCount: keyMap.get(w._id) || 0,
        requestCount: stats.count || 0,
        totalSpend: parseFloat((stats.spend || 0).toFixed(6)),
        createdAt: w.created_at
      };
    });
  },

  /**
   * Creates a new workspace in an organization
   */
  createWorkspace: async ({ organizationId, userId, name }) => {
    if (!name || typeof name !== 'string' || !name.trim()) {
      const err = new Error('Workspace name is required.');
      err.statusCode = 400;
      throw err;
    }

    const ws = await Workspace.create({
      organization_id: organizationId,
      name: name.trim(),
      is_default: false
    });

    // Audit log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: userId,
        action: 'workspace.create',
        details: { workspaceId: ws._id, name: ws.name }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    realtimeService.emitWorkspaceCreated(organizationId, ws);

    return {
      id: ws._id,
      name: ws.name,
      isDefault: ws.is_default,
      keyCount: 0,
      requestCount: 0,
      totalSpend: 0,
      createdAt: ws.created_at
    };
  },

  /**
   * Deletes a workspace (prevent deleting default workspace)
   */
  deleteWorkspace: async ({ organizationId, userId, workspaceId }) => {
    if (!workspaceId || typeof workspaceId !== 'string') {
      const err = new Error('Workspace not found.');
      err.statusCode = 404;
      throw err;
    }

    const ws = await Workspace.findOne({
      _id: workspaceId,
      organization_id: organizationId
    }).lean();

    if (!ws) {
      const err = new Error('Workspace not found.');
      err.statusCode = 404;
      throw err;
    }

    if (ws.is_default) {
      const err = new Error('Cannot delete the organization default workspace.');
      err.statusCode = 400;
      throw err;
    }

    await Workspace.deleteOne({ _id: workspaceId, organization_id: organizationId });

    // Clean up or revoke keys in this workspace
    await ApiKey.updateMany(
      { workspace_id: workspaceId, organization_id: organizationId },
      { $set: { status: 'revoked' } }
    );

    // Safe document file and metadata descriptor cleanup for this workspace
    try {
      const uploadDir = path.join(process.cwd(), 'uploads', 'documents');
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        const metaFiles = files.filter(f => f.endsWith('.meta.json'));
        for (const metaFile of metaFiles) {
          try {
            const metaPath = path.join(uploadDir, metaFile);
            if (!metaPath.startsWith(uploadDir)) continue;

            const content = fs.readFileSync(metaPath, 'utf8');
            const meta = JSON.parse(content);

            // Strictly match BOTH workspaceId and organizationId
            if (meta.workspaceId === workspaceId && meta.organizationId === organizationId) {
              if (meta.storedFilename) {
                const safeBasename = path.basename(meta.storedFilename);
                const binaryPath = path.join(uploadDir, safeBasename);
                if (binaryPath.startsWith(uploadDir) && fs.existsSync(binaryPath)) {
                  fs.unlinkSync(binaryPath);
                }
              }
              if (fs.existsSync(metaPath)) {
                fs.unlinkSync(metaPath);
              }
            }
          } catch (fileErr) {
            console.warn(`[Document Cleanup Warning]: Could not clean document ${metaFile}:`, fileErr.message);
          }
        }
      }
    } catch (cleanupErr) {
      console.warn('[Workspace Cleanup Warning]: Non-fatal error cleaning workspace documents:', cleanupErr.message);
    }

    // Audit log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: userId,
        action: 'workspace.delete',
        details: { workspaceId }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    realtimeService.emitWorkspaceDeleted(organizationId, workspaceId);

    return { success: true };
  },

  /**
   * Retrieves a single workspace by ID with usage aggregates
   */
  getWorkspaceById: async ({ organizationId, workspaceId }) => {
    if (!workspaceId || typeof workspaceId !== 'string') {
      const err = new Error('Workspace ID is required.');
      err.statusCode = 400;
      throw err;
    }

    const ws = await Workspace.findOne({
      _id: workspaceId,
      organization_id: organizationId
    }).lean();

    if (!ws) {
      const err = new Error('Workspace not found.');
      err.statusCode = 404;
      throw err;
    }

    const keyCount = await ApiKey.countDocuments({
      workspace_id: workspaceId,
      organization_id: organizationId
    });

    const reqStats = await AiRequest.aggregate([
      { $match: { workspace_id: workspaceId, organization_id: organizationId } },
      {
        $group: {
          _id: '$workspace_id',
          requestCount: { $sum: 1 },
          totalSpend: { $sum: '$cost_usd' }
        }
      }
    ]);

    const stats = reqStats[0] || { requestCount: 0, totalSpend: 0 };

    return {
      id: ws._id,
      name: ws.name,
      isDefault: Boolean(ws.is_default),
      keyCount,
      requestCount: stats.requestCount,
      totalSpend: parseFloat((stats.totalSpend || 0).toFixed(6)),
      createdAt: ws.created_at
    };
  },

  /**
   * Updates an existing workspace name
   */
  updateWorkspace: async ({ organizationId, userId, workspaceId, name }) => {
    if (!workspaceId || typeof workspaceId !== 'string') {
      const err = new Error('Workspace ID is required.');
      err.statusCode = 400;
      throw err;
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      const err = new Error('Valid workspace name is required.');
      err.statusCode = 400;
      throw err;
    }

    const trimmedName = name.trim();
    if (trimmedName.length > 100) {
      const err = new Error('Workspace name cannot exceed 100 characters.');
      err.statusCode = 400;
      throw err;
    }

    const ws = await Workspace.findOne({
      _id: workspaceId,
      organization_id: organizationId
    });

    if (!ws) {
      const err = new Error('Workspace not found.');
      err.statusCode = 404;
      throw err;
    }

    const previousName = ws.name;
    ws.name = trimmedName;
    await ws.save();

    // Audit log
    try {
      await AuditLog.create({
        organization_id: organizationId,
        actor_id: userId,
        action: 'workspace.update',
        details: { workspaceId, previousName, newName: trimmedName }
      });
    } catch (auditErr) {
      console.warn('Audit log write error (non-fatal):', auditErr.message);
    }

    return {
      id: ws._id,
      name: ws.name,
      isDefault: Boolean(ws.is_default),
      createdAt: ws.created_at
    };
  }
};
