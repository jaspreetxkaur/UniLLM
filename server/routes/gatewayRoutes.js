import express from 'express';
import { gatewayController } from '../controllers/gatewayController.js';
import { authenticateGateway } from '../middleware/apiKeyAuth.js';

const router = express.Router();

// Mount universal chat completions endpoint (protected by API Key or JWT)
router.post('/chat/completions', authenticateGateway, gatewayController.createChatCompletion);

export default router;
