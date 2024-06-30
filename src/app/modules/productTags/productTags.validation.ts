import { z } from 'zod';

const createProductTagsValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateProductTagsValidation = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const ProductTagsValidation = {
  createProductTagsValidation,
  updateProductTagsValidation,
};
