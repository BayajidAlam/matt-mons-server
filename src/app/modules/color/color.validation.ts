import { z } from 'zod';

const createColor = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateColor = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const ColorsValidation = {
  createColor,
  updateColor,
};
