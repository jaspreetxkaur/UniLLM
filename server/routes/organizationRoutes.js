import express from 'express';
import { organizationController } from '../controllers/organizationController.js';
import { authenticateUser } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// All organization endpoints require valid JWT authentication
router.use(authenticateUser);

// Budget Endpoints
router.get('/budget', organizationController.getBudget);
router.put('/budget', requireRole(['owner', 'admin']), organizationController.updateBudget);

export default router;
