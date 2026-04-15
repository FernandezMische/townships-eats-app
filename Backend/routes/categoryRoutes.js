import express from 'express';
import { getCategories, getCategoryItems } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:id/items', getCategoryItems);

export default router;