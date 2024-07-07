import { z } from 'zod';

const createPayMode = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    shopId: z.string({
      required_error: 'ShopId is required',
    }),
  }),
});

const updatePayMode = z.object({
  body: z.object({
    title: z.string().optional(),
    shopId: z.string().optional(),
  }),
});

export const PayModeValidation = {
  createPayMode,
  updatePayMode,
};
