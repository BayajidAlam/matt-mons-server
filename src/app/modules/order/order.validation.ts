import { OrderStatus, PaymentMode } from '@prisma/client';
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
    subTotal: z.string(),
    shippingCharge: z.string(),
    tax: z.string(),
    total: z.string(),
    orderStatus: z.nativeEnum(OrderStatus).default('received'),
    paymentMode: z.nativeEnum(PaymentMode),
    paidAmount: z.number({ required_error: 'Paid amount is required' }),
    dueAmount: z.number({ required_error: ' Due amount is required' }),
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
    subTotal: z.string().optional(),
    shippingCharge: z.string().optional(),
    tax: z.string().optional(),
    total: z.string().optional(),
    orderStatus: z.nativeEnum(OrderStatus).optional(),
    paymentMode: z.nativeEnum(PaymentMode).optional(),
    paidAmount: z.number().optional(),
    dueAmount: z.number().optional(),
  }),
});

export const OrderValidation = {
  createOrder,
  updateOrder,
};
