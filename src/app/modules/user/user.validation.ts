import { z } from 'zod';
import { bloodGroup } from '../../../constaints/bloodGroup';

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
      address: z.string({
        required_error: 'Address is Required',
      }).optional(),
      profileImg: z.string({
        required_error: 'Profile Image is Required',
      }).optional(),
      nidNumber: z.string({ required_error: 'Nid Number is Required' }),
      isActive: z.boolean(),
      shopId: z.string().optional(),
    }),
  }),
});

const createDriver = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User Name is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    driver: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      mobile: z.string({ required_error: 'Mobile No is Required' }),
      address: z.string().optional(),
      licenseNo: z.string().optional(),
      bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

const createHelper = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User Name is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    helper: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      mobile: z.string({ required_error: 'Mobile No is Required' }),
      address: z.string().optional(),
      bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createSuperAdmin,
  createAdmin,
  createSeller,
  createSellsManager,
  createDriver,
  createHelper,
};
