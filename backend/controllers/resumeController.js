import Resume from '../models/Resume.js';

export async function uploadResume(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const doc = await Resume.create({
      fileUrl: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });
    res.status(201).json(doc);
  } catch (err) { next(err); }
}

export async function getLatestResume(req, res, next) {
  try {
    const doc = await Resume.findOne().sort({ uploadedAt: -1 });
    if (!doc) return res.status(404).json({ message: 'No resume uploaded yet' });
    res.json(doc);
  } catch (err) { next(err); }
}
