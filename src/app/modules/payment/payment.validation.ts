import { z } from 'zod';

const createPayment = z.object({
  body: z.object({
    trnxId: z.string({
      required_error: 'Transaction ID is required',
    }),
    userId: z.string({
      required_error: 'User ID is required',
    }),
    orderId: z.string({
      required_error: 'Order ID is required',
    }),
  }),
});

const updatePayment = z.object({
  body: z.object({
    trnxId: z.string().optional(),
    userId: z.string().optional(),
    orderId: z.string().optional(),
  }),
});

export const PaymentsValidation = {
  createPayment,
  updatePayment,
};