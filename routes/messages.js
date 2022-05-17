import express from 'express';
import { createMessage, getAllMessages } from '../controllers/messages.js';
import { cookieJwtAuth } from '../middleware/cookieJwtAuth.js';

const router = express.Router();

router.post('/', cookieJwtAuth, createMessage);
router.get('/', cookieJwtAuth, getAllMessages);

export default router;