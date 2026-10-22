import express from 'express';
import { auditController } from '../controllers/auditController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
router.use(authenticateUser);

router.get('/', auditController.list);

export default router;
