import { z } from 'zod';
import { bloodGroup } from '../../../constaints/bloodGroup';

const createSuperAdmin = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User Name is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    superAdmin: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      mobile: z.string({ required_error: 'Mobile No is Required' }),
      address: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

const createAdmin = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User Name is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
    admin: z.object({
      fullName: z.string({ required_error: 'Full Name is Required' }),
      mobile: z.string({ required_error: 'Mobile No is Required' }),
      address: z.string().optional(),
      profileImg: z.string().optional(),
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
  createDriver,
  createHelper,
};
