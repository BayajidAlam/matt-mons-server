import { z } from 'zod';

const createCart = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'Title is required',
    }),
    productId: z.string({
      required_error: 'ProductId is required',
    }),
  }),
});

const updateCart = z.object({
  userId: z.string().optional(),
  productId: z.string().optional(),
});

export const CartValidation = {
  createCart,
  updateCart,
};
