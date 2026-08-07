import express from 'express';
import Achievement from '../models/Achievement.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll(Achievement));
router.get('/:id', getOne(Achievement));
router.post('/', protect, createOne(Achievement));
router.put('/:id', protect, updateOne(Achievement));
router.delete('/:id', protect, deleteOne(Achievement));

export default router;
