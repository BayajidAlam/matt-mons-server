import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId is required',
    }),
    shopId: z.string({
      required_error: 'ShopId is required',
    }),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    email: z.string().email({
      message: 'Invalid email format',
    }),
    address: z.string().optional(),
    products: z.array(z.object({})),
  }),
});

const updateOrder = z.object({
  body: z.object({
    userId: z.string().optional(),
    shopId: z.string().optional(),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    email: z
      .string()
      .email({
        message: 'Invalid email format',
      })
      .optional(),
    address: z.string().optional(),
    products: z.array(z.object({})).optional(),
  }),
});

export const OrderValidation = {
  createOrder,
  updateOrder,
};
