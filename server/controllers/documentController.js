import path from 'path';
import fs from 'fs';
import { Workspace } from '../models/index.js';
import { UPLOAD_DIR } from '../middleware/upload.js';

export const documentController = {
  /**
   * Upload a document to an authorized workspace
   * POST /api/workspaces/:workspaceId/documents
   */
  upload: async (req, res) => {
    try {
      const { workspaceId } = req.params;

      // 1. Verify workspace existence and organization ownership
      const workspace = await Workspace.findOne({
        _id: workspaceId,
        organization_id: req.user.organizationId
      }).lean();

      if (!workspace) {
        // Remove uploaded file if authorization check fails
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({
          success: false,
          message: 'Workspace not found or access denied.'
        });
      }

      // 2. Prepare metadata
      const docId = req.file.documentId;
      const storedFilename = path.basename(req.file.path);
      const originalName = path.basename(req.file.originalname);
      const mimeType = req.file.mimetype;
      const sizeBytes = req.file.size;
      const uploadedAt = new Date().toISOString();

      const metadata = {
        id: docId,
        workspaceId,
        organizationId: req.user.organizationId,
        originalName,
        storedFilename,
        mimeType,
        sizeBytes,
        storage: 'local-disk',
        uploadedBy: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role
        },
        uploadedAt
      };

      // 3. Persist document metadata to separate JSON descriptor file
      const metaPath = path.join(UPLOAD_DIR, `${docId}.meta.json`);
      fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2), 'utf8');

      // 4. Return sanitized response (never expose server filesystem paths)
      return res.status(201).json({
        success: true,
        message: 'Document uploaded successfully.',
        document: {
          id: docId,
          workspaceId,
          originalName,
          mimeType,
          sizeBytes,
          storage: 'local-disk',
          uploadedBy: metadata.uploadedBy,
          uploadedAt
        }
      });
    } catch (err) {
      console.error('[Document Upload Error]:', err);
      if (req.file && fs.existsSync(req.file.path)) {
        try { fs.unlinkSync(req.file.path); } catch (_) {}
      }
      return res.status(500).json({
        success: false,
        message: 'Internal server error while processing document upload.'
      });
    }
  },

  /**
   * List all documents uploaded to an authorized workspace
   * GET /api/workspaces/:workspaceId/documents
   */
  list: async (req, res) => {
    try {
      const { workspaceId } = req.params;

      // 1. Verify workspace exists and belongs to the user's organization
      const workspace = await Workspace.findOne({
        _id: workspaceId,
        organization_id: req.user.organizationId
      }).lean();

      if (!workspace) {
        return res.status(404).json({
          success: false,
          message: 'Workspace not found or access denied.'
        });
      }

      // 2. Read all metadata files in the uploads directory
      if (!fs.existsSync(UPLOAD_DIR)) {
        return res.json({ success: true, count: 0, documents: [] });
      }

      const files = fs.readdirSync(UPLOAD_DIR);
      const metaFiles = files.filter(f => f.endsWith('.meta.json'));

      const documents = [];
      for (const metaFile of metaFiles) {
        try {
          const content = fs.readFileSync(path.join(UPLOAD_DIR, metaFile), 'utf8');
          const meta = JSON.parse(content);

          // Strictly filter by workspaceId and organizationId
          if (meta.workspaceId === workspaceId && meta.organizationId === req.user.organizationId) {
            documents.push({
              id: meta.id,
              workspaceId: meta.workspaceId,
              originalName: meta.originalName,
              mimeType: meta.mimeType,
              sizeBytes: meta.sizeBytes,
              storage: meta.storage || 'local-disk',
              uploadedBy: meta.uploadedBy,
              uploadedAt: meta.uploadedAt
            });
          }
        } catch (readErr) {
          console.warn(`Failed to read metadata file ${metaFile}:`, readErr.message);
        }
      }

      // Sort newest first
      documents.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

      return res.json({
        success: true,
        count: documents.length,
        documents
      });
    } catch (err) {
      console.error('[Document List Error]:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to list workspace documents.'
      });
    }
  },

  /**
   * Download an authorized document
   * GET /api/workspaces/:workspaceId/documents/:id/download
   */
  download: async (req, res) => {
    try {
      const { workspaceId, id } = req.params;

      // 1. Verify workspace belongs to user's organization
      const workspace = await Workspace.findOne({
        _id: workspaceId,
        organization_id: req.user.organizationId
      }).lean();

      if (!workspace) {
        return res.status(404).json({
          success: false,
          message: 'Workspace not found or access denied.'
        });
      }

      // 2. Check metadata descriptor
      const metaPath = path.join(UPLOAD_DIR, `${id}.meta.json`);
      if (!fs.existsSync(metaPath)) {
        return res.status(404).json({
          success: false,
          message: 'Document not found.'
        });
      }

      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

      // 3. Strict organization and workspace matching
      if (meta.workspaceId !== workspaceId || meta.organizationId !== req.user.organizationId) {
        return res.status(404).json({
          success: false,
          message: 'Document not found or access denied.'
        });
      }

      // 4. Locate binary on disk
      const binaryPath = path.join(UPLOAD_DIR, meta.storedFilename);
      if (!fs.existsSync(binaryPath)) {
        return res.status(404).json({
          success: false,
          message: 'Binary document content missing from storage.'
        });
      }

      // 5. Safe file download
      return res.download(binaryPath, meta.originalName);
    } catch (err) {
      console.error('[Document Download Error]:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to download document.'
      });
    }
  },

  /**
   * Delete an authorized document
   * DELETE /api/workspaces/:workspaceId/documents/:id
   */
  delete: async (req, res) => {
    try {
      const { workspaceId, id } = req.params;

      // 1. Verify workspace belongs to user's organization
      const workspace = await Workspace.findOne({
        _id: workspaceId,
        organization_id: req.user.organizationId
      }).lean();

      if (!workspace) {
        return res.status(404).json({
          success: false,
          message: 'Workspace not found or access denied.'
        });
      }

      // 2. Read metadata descriptor
      const metaPath = path.join(UPLOAD_DIR, `${id}.meta.json`);
      if (!fs.existsSync(metaPath)) {
        return res.status(404).json({
          success: false,
          message: 'Document not found.'
        });
      }

      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

      // 3. Verify organization and workspace matching
      if (meta.workspaceId !== workspaceId || meta.organizationId !== req.user.organizationId) {
        return res.status(404).json({
          success: false,
          message: 'Document not found or access denied.'
        });
      }

      // 4. Authorization check: Owners and Admins can delete any doc; Members can delete their own
      const userRole = (req.user.role || '').toLowerCase();
      const isOwnerOrAdmin = ['owner', 'admin'].includes(userRole);
      const isUploader = meta.uploadedBy && String(meta.uploadedBy.id) === String(req.user.id);

      if (!isOwnerOrAdmin && !isUploader) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You do not have permission to delete this document.'
        });
      }

      // 5. Remove binary file
      const binaryPath = path.join(UPLOAD_DIR, meta.storedFilename);
      if (fs.existsSync(binaryPath)) {
        fs.unlinkSync(binaryPath);
      }

      // 6. Remove metadata descriptor
      if (fs.existsSync(metaPath)) {
        fs.unlinkSync(metaPath);
      }

      return res.json({
        success: true,
        message: 'Document deleted successfully.'
      });
    } catch (err) {
      console.error('[Document Delete Error]:', err);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete document.'
      });
    }
  }
};
