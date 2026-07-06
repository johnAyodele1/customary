import { Router } from 'express';
import * as adminController from './admin.controller.js';
import { validate } from '../shared/validate.js';
import { adminLoginSchema, updateOrderStatusSchema } from './admin.schema.js';

const router = Router();

router.post('/login', validate(adminLoginSchema), adminController.login);

router.use(adminController.protect);

router.get('/orders', adminController.getOrders);
router.patch('/orders/:id', validate(updateOrderStatusSchema), adminController.updateOrderStatus);

export default router;
