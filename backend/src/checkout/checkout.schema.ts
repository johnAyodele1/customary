import { z } from 'zod';

export const checkoutSchema = z.object({
  body: z.object({
    customer_name: z.string().min(1),
    address: z.string().min(1),
    whatsapp: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid WhatsApp number format'),
    email: z.string().email(),
    items: z.array(z.object({
      category_id: z.number(),
      customization_data: z.record(z.any()),
      image_urls: z.array(z.string()).optional(),
      price: z.number().positive(),
      quantity: z.number().int().positive().default(1),
    })).min(1),
  }),
});

export const getOrderSchema = z.object({
  params: z.object({
    token: z.string().min(1),
  }),
});

export const paystackWebhookSchema = z.object({
  body: z.object({
    event: z.string(),
    data: z.object({
      reference: z.string(),
      status: z.string(),
      amount: z.number(),
      metadata: z.any().optional(),
    }),
  }),
  headers: z.object({
    'x-paystack-signature': z.string(),
  }),
});
