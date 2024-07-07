import { z } from 'zod';

const createCart = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'Title is required',
    }),
    productId: z.string({
      required_error: 'ProductId is required',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
      })
      .default(1),
  }),
});

const updateCart = z.object({
  userId: z.string().optional(),
  productId: z.string().optional(),
  quantity: z.number().optional(),
});

export const CartValidation = {
  createCart,
  updateCart,
};
