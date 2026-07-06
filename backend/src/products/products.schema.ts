import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    fields: z.array(z.object({
      field_type: z.enum(['text', 'image', 'select']),
      label: z.string().min(1),
      required: z.boolean().default(false),
      options: z.any().optional(),
    })).optional(),
  }),
});

export const getCategorySchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});
