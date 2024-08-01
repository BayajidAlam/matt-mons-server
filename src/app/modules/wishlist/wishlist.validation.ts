import { z } from 'zod';

const createWishlist = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'Title is required',
    }),
    productId: z.string({
      required_error: 'ProductId is required',
    }),
  }),
});

export const WishlistValidation = {
  createWishlist,
};
