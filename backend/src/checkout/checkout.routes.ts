import { Router } from 'express';
import * as checkoutController from './checkout.controller.js';
import { validate } from '../shared/validate.js';
import { checkoutSchema, getOrderSchema } from './checkout.schema.js';

const router = Router();

router.post('/', validate(checkoutSchema), checkoutController.checkout);
router.get('/status/:token', validate(getOrderSchema), checkoutController.getOrderStatus);

export default router;
