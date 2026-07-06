import { Router } from 'express';
import * as productsController from './products.controller.js';
import { validate } from '../shared/validate.js';
import { createCategorySchema, getCategorySchema } from './products.schema.js';
import { protect } from '../admin/admin.controller.js';

const router = Router();

router.get('/', productsController.listCategories);
router.get('/:slug', validate(getCategorySchema), productsController.getCategory);

// Protected admin routes for category management
router.post('/', protect, validate(createCategorySchema), productsController.addCategory);
router.delete('/:id', protect, productsController.deleteCategory);

export default router;
