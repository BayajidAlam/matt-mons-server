import { z } from 'zod';

const createSize = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

const updateSize = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

export const SizeValidation = {
  createSize,
  updateSize
};
