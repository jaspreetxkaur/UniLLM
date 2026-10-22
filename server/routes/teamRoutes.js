import express from 'express';
import { teamController } from '../controllers/teamController.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();
router.use(authenticateUser);

router.get('/', teamController.list);
router.post('/invite', requireRole(['owner', 'admin']), teamController.invite);
router.put('/:memberId', requireRole(['owner', 'admin']), teamController.update);
router.delete('/:memberId', requireRole(['owner', 'admin']), teamController.remove);

export default router;
