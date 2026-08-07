import express from 'express';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Generic image upload (project images, profile photo, certificate scans)
// Returns a URL you can save onto any resource (Project.image, Profile.profileImage, etc.)
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
