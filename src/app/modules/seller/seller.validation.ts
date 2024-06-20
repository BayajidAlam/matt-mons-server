import { z } from 'zod';
import { bloodGroup } from '../../../constaints/bloodGroup';


const update = z.object({
  body: z.object({
    fullName: z.string().optional(),
    mobile: z.string().optional(),
    address: z.string().optional(),
    bloodGroup: z.enum(bloodGroup as [string, ...string[]]).optional(),
    profileImg: z.string().optional(),
  }),
});

export const HelperValidation = {
  update,
};