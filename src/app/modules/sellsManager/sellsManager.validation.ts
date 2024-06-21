import { z } from 'zod';

const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    contactNumber: z.string().optional(), 
    emergencyContactNumber: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
    userId: z.string().optional(), 
    nidNumber: z.string().optional(),
    isActive: z.boolean().optional(),
    shopId: z.string().optional(),
  }),
});

export const SellsManagerValidation = {
  update,
};