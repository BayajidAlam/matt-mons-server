import { z } from 'zod';

const createProductTagsValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const ProductTagsValidation = {
  createProductTagsValidation,
};