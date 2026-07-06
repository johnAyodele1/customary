import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY || '';

export const initializeTransaction = async (email: string, amount: number, metadata: any) => {
  const response = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    {
      email,
      amount: amount * 100, // Paystack amount is in kobo
      metadata,
      callback_url: `${process.env.FRONTEND_URL}/payment-callback`,
    },
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const verifyWebhookSignature = (body: string, signature: string) => {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET)
    .update(body)
    .digest('hex');
  return hash === signature;
};
