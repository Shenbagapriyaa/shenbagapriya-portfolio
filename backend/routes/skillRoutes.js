import express from 'express';
import Skill from '../models/Skill.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll(Skill));
router.get('/:id', getOne(Skill));
router.post('/', protect, createOne(Skill));
router.put('/:id', protect, updateOne(Skill));
router.delete('/:id', protect, deleteOne(Skill));

export default router;
