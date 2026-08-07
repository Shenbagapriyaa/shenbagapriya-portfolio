import express from 'express';
import Certificate from '../models/Certificate.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll(Certificate));
router.get('/:id', getOne(Certificate));
router.post('/', protect, createOne(Certificate));
router.put('/:id', protect, updateOne(Certificate));
router.delete('/:id', protect, deleteOne(Certificate));

export default router;
