import express from 'express';
import { documentController } from '../controllers/documentController.js';
import { handleDocumentUpload } from '../middleware/upload.js';

// Enable mergeParams to access :workspaceId from the parent router
const router = express.Router({ mergeParams: true });

// 1. Upload Document to Workspace
// POST /api/workspaces/:workspaceId/documents
router.post('/', handleDocumentUpload, documentController.upload);

// 2. List All Documents in Workspace
// GET /api/workspaces/:workspaceId/documents
router.get('/', documentController.list);

// 3. Download Authorized Document
// GET /api/workspaces/:workspaceId/documents/:id/download
router.get('/:id/download', documentController.download);

// 4. Delete Authorized Document
// DELETE /api/workspaces/:workspaceId/documents/:id
router.delete('/:id', documentController.delete);

export default router;
