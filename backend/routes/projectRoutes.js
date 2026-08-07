import express from 'express';
import Project from '../models/Project.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll(Project));
router.get('/:id', getOne(Project));
router.post('/', protect, createOne(Project));
router.put('/:id', protect, updateOne(Project));
router.delete('/:id', protect, deleteOne(Project));

export default router;
