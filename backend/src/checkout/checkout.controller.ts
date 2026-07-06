import { Request, Response } from 'express';
import * as checkoutService from './checkout.service.js';
import { initializeTransaction } from '../shared/paystack.js';

export const checkout = async (req: Request, res: Response) => {
  try {
    const order = await checkoutService.createDraftOrder(req.body);

    const paystackData = await initializeTransaction(order.email, order.total_amount, {
      order_id: order.id,
      order_token: order.order_token,
    });

    await checkoutService.setOrderReference(order.id, paystackData.data.reference);

    res.json({
      status: 'success',
      data: {
        order_token: order.order_token,
        payment_url: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ status: 'error', message: 'Checkout failed' });
  }
};

export const getOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await checkoutService.getOrderByToken(req.params.token);
    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }
    res.json({ status: 'success', data: { status: order.status } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch order status' });
  }
};
