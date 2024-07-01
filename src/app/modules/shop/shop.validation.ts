import { z } from 'zod';

const createShop = z.object({
  body: z.object({
    sellerId: z.string({ required_error: 'Seller ID is Required' }),
    shopName: z.string({ required_error: 'Shop Name is Required' }),
    shopImage: z.string({ required_error: 'Shop Image is Required' }),
    rating: z.string({ required_error: 'Rating is Required' }).default('0'),
    location: z.string({ required_error: 'Location is Required' }),
    isVerified: z.boolean().optional(),
  }),
});

const updateShop = z.object({
  body: z.object({
    sellerId: z.string().optional(),
    shopName: z.string().optional(),
    shopImage: z.string().optional(),
    rating: z.string().optional(),
    location: z.string().optional(),
    isVerified: z.boolean().optional(),
  }),
});

export const ShopValidation = {
  createShop,
  updateShop,
};
