import express from 'express';
import { policyController } from '../controllers/policyController.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

router.get('/', authenticateUser, policyController.getPolicies);
router.get('/:id', authenticateUser, policyController.getPolicyById);
router.post('/', authenticateUser, requireRole(['owner', 'admin']), policyController.createPolicy);
router.put('/:id', authenticateUser, requireRole(['owner', 'admin']), policyController.updatePolicy);
router.delete('/:id', authenticateUser, requireRole(['owner', 'admin']), policyController.deletePolicy);
router.post('/:id/toggle', authenticateUser, requireRole(['owner', 'admin']), policyController.togglePolicy);

export default router;
