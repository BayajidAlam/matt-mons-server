import { z } from 'zod';

const createProductSku = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    availableColor: z.array(z.string()).nonempty({
      message: 'At least one color is required',
    }),
    availableSize: z.array(z.string()).nonempty({
      message: 'At least one size is required',
    }),
  }),
});

export const ProductSkuValidation = {
  createProductSku,
};