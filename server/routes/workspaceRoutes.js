import express from 'express';
import { workspaceController } from '../controllers/workspaceController.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import documentRoutes from './documentRoutes.js';

const router = express.Router();
router.use(authenticateUser);

router.get('/', workspaceController.list);
router.post('/', requireRole(['owner', 'admin']), workspaceController.create);
router.get('/:id', workspaceController.getById);
router.put('/:id', requireRole(['owner', 'admin']), workspaceController.update);
router.delete('/:id', requireRole(['owner', 'admin']), workspaceController.delete);

// Workspace Document Management (Multer file upload)
router.use('/:workspaceId/documents', documentRoutes);

export default router;
