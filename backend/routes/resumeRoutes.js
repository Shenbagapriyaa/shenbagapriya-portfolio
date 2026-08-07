import express from 'express';
import { uploadResume, getLatestResume } from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getLatestResume);
router.post('/', protect, upload.single('resume'), uploadResume);

export default router;
