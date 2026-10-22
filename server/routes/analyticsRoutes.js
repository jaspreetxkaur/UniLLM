import express from 'express';
import { analyticsController } from '../controllers/analyticsController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All analytics endpoints require valid JWT user authentication
router.use(authenticateUser);

router.get('/overview', analyticsController.getOverview);
router.get('/requests', analyticsController.getRequests);
router.get('/costs', analyticsController.getCosts);

export default router;
