import { Request, Response } from 'express';
import * as checkoutService from '../checkout/checkout.service.js';
import { verifyWebhookSignature } from '../shared/paystack.js';

export const handleWebhook = async (req: Request, res: Response) => {
  const signature = req.headers['x-paystack-signature'] as string;
  const body = JSON.stringify(req.body);

  if (!verifyWebhookSignature(body, signature)) {
    return res.status(400).json({ status: 'error', message: 'Invalid signature' });
  }

  const { event, data } = req.body;

  if (event === 'charge.success') {
    if (data.status === 'success') {
      await checkoutService.updateOrderStatus(data.reference, 'paid');
      console.log(`Order with reference ${data.reference} marked as paid.`);
    }
  }

  res.json({ status: 'success' });
};
