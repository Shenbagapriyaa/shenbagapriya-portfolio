import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

const allowedTypes = /jpeg|jpg|png|webp|pdf/;

function fileFilter(req, file, cb) {
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) return cb(null, true);
  cb(new Error('Only images (jpg/png/webp) and PDF files are allowed'));
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 } // 8MB
});
