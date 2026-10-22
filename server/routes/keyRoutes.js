import express from 'express';
import { keyController } from '../controllers/keyController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All API key management endpoints require a valid user session
router.use(authenticateUser);

router.post('/', keyController.create);
router.get('/', keyController.list);
router.post('/:id/revoke', keyController.revoke);
router.delete('/:id', keyController.revoke);

export default router;
