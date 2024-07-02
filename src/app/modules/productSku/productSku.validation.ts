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
    quantity: z.string({
      required_error: 'Quantity is required',
    }),
    shopId: z.string({
      required_error: 'ShopId is required',
    }),
  }),
});

const updateProductSku = z.object({
  body: z.object({
    title: z.string().optional(),
    availableColor: z.array(z.string()).optional(),
    availableSize: z.array(z.string()).optional(),
    quantity: z.string().optional(),
    shopId: z.string().optional(),
  }),
});

export const ProductSkuValidation = {
  createProductSku,
  updateProductSku,
};
