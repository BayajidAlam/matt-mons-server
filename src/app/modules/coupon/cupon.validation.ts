import { z } from 'zod';

const createCoupon = z.object({
  body: z.object({
    shopId: z.string({
      required_error: 'Shop ID is required',
    }),
    couponName: z.string({
      required_error: 'Coupon name is required',
    }),
    discount: z.string({
      required_error: 'Discount name is required',
    }),
    shippingCharge: z.string({
      required_error: 'Shipping charge is required',
    }),
    validTill: z.string({
      required_error: 'Valid till is required',
    }),
    createdBy: z.string({
      required_error: 'Created by is required',
    }),
  }),
});

const updateCoupon = z.object({
  body: z.object({
    shopId: z.string().optional(),
    discount: z.string().optional(),
    shippingCharge: z.string().optional(),
    validTill: z.string().optional(),
    createdBy: z.string().optional(),
  }),
});

export const CouponValidation = {
  createCoupon,
  updateCoupon,
};
