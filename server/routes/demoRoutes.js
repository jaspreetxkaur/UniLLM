import express from 'express';
import { demoController } from '../controllers/demoController.js';

const router = express.Router();

// Middleware to capture precision start timestamp at router entry
router.use((req, res, next) => {
  if (!req._startNs) {
    req._startNs = process.hrtime.bigint();
  }
  next();
});

// GET /api/demo/request-lifecycle
router.get('/request-lifecycle', demoController.getRequestLifecycle);

export default router;
