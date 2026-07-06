import { Router } from 'express';
import * as paymentsController from './payments.controller.js';
import { validate } from '../shared/validate.js';
import { paystackWebhookSchema } from '../checkout/checkout.schema.js';

const router = Router();

router.post('/webhook', validate(paystackWebhookSchema), paymentsController.handleWebhook);

export default router;
