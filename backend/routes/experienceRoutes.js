import express from 'express';
import Experience from '../models/Experience.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll(Experience));
router.get('/:id', getOne(Experience));
router.post('/', protect, createOne(Experience));
router.put('/:id', protect, updateOne(Experience));
router.delete('/:id', protect, deleteOne(Experience));

export default router;
