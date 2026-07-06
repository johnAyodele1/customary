import { z } from 'zod';

export const adminLoginSchema = z.object({
  body: z.object({
    password: z.string().min(1),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
  }),
  body: z.object({
    status: z.enum(['pending', 'paid', 'fulfilled']),
  }),
});
