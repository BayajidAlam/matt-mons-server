import { z } from 'zod';

const createCustomer = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'Full name is required',
    }),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
    userId: z.string({
      required_error: 'User ID is required',
    }),
    isActive: z.boolean().optional(),
    dob: z.string().optional(),
  }),
});

const updateCustomer = z.object({
  body: z.object({
    fullName: z.string().optional(),
    contactNumber: z.string().optional(),
    emergencyContactNumber: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
    userId: z.string().optional(),
    isActive: z.boolean().optional(),
    dob: z.string().optional(),
  }),
});

export const CustomerValidation = {
  createCustomer,
  updateCustomer,
};