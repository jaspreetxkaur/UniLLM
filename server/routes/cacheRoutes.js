import express from 'express';
import { cacheService } from '../services/cacheService.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

router.get('/metrics', (req, res) => {
  const organizationId = req.user.organizationId;
  const metrics = cacheService.getMetrics(organizationId);
  return res.json({ success: true, metrics });
});

router.post('/clear', (req, res) => {
  const organizationId = req.user.organizationId;
  const clearedCount = cacheService.clearOrganization(organizationId);
  return res.json({
    success: true,
    message: `Organization cache purged successfully (${clearedCount} entries cleared).`
  });
});

export default router;
