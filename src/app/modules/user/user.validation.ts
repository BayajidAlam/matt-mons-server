import { z } from 'zod';

const createSuperAdmin = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    superAdmin: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      contactNumber: z.string({ required_error: 'Contact Number is Required' }),
      emergencyContactNumber: z.string({
        required_error: 'Emergency Contact Number is Required',
      }),
      address: z.string({
        required_error: 'Address is Required',
      }),
      profileImg: z.string({
        required_error: 'profile Image is Required',
      }),
      nidNumber: z.string({
        required_error: 'Nid Number is Required',
      }),
      isActive: z.boolean({}),
    }),
  }),
});

const createAdmin = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    admin: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      contactNumber: z.string({ required_error: 'Contact Number is Required' }),
      emergencyContactNumber: z
        .string({ required_error: 'Emergency Contact Number is Required' })
        .optional(),
      address: z.string().optional(),
      profileImg: z.string().optional(),
      nidNumber: z
        .string({ required_error: 'Nid Number is Required' })
        .optional(),
      isActive: z.boolean().optional(),
    }),
  }),
});

const createSeller = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    seller: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      contactNumber: z.string({ required_error: 'Contact Number is Required' }),
      emergencyContactNumber: z
        .string({ required_error: 'Emergency Contact Number is Required' })
        .optional(),
      address: z.string({
        required_error: 'Address is Required',
      }),
      profileImg: z.string({
        required_error: 'Profile Image is Required',
      }),
      nidNumber: z.string({ required_error: 'Nid Number is Required' }),
      isActive: z.boolean(),
    }),
  }),
});

const createSellsManager = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    sellsManager: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      contactNumber: z.string({ required_error: 'Contact Number is Required' }),
      emergencyContactNumber: z
        .string({ required_error: 'Emergency Contact Number is Required' })
        .optional(),
      address: z
        .string({
          required_error: 'Address is Required',
        })
        .optional(),
      profileImg: z
        .string({
          required_error: 'Profile Image is Required',
        })
        .optional(),
      nidNumber: z.string({ required_error: 'Nid Number is Required' }),
      isActive: z.boolean(),
      shopId: z.string().optional(),
    }),
  }),
});

const createCustomer = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    customer: z.object({
      fullName: z.string({ required_error: 'Full Name is Required!' }),
      contactNumber: z
        .string()
        .optional()
        .refine(val => val == null || /^\+?[1-9]\d{1,14}$/.test(val), {
          message: 'Invalid contact number format',
        }),
      emergencyContactNumber: z
        .string()
        .optional()
        .refine(val => val == null || /^\+?[1-9]\d{1,14}$/.test(val), {
          message: 'Invalid emergency contact number format',
        }),
      address: z.string().optional(),
      profileImg: z.string().optional(),
      isActive: z.boolean().default(true),
      dob: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createSuperAdmin,
  createAdmin,
  createSeller,
  createSellsManager,
  createCustomer,
};
