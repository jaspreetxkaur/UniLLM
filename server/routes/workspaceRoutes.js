import express from 'express';
import { workspaceController } from '../controllers/workspaceController.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();
router.use(authenticateUser);

router.get('/', workspaceController.list);
router.post('/', requireRole(['owner', 'admin']), workspaceController.create);
router.delete('/:id', requireRole(['owner', 'admin']), workspaceController.delete);

export default router;
