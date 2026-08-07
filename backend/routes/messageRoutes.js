import express from 'express';
import { createMessage, getMessages, markRead, deleteMessage } from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createMessage);          // public - contact form submits here
router.get('/', protect, getMessages);    // admin only
router.patch('/:id/read', protect, markRead);
router.delete('/:id', protect, deleteMessage);

export default router;
