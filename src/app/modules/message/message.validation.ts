import { z } from 'zod';

const createMessage = z.object({
  body: z.object({
    message: z.string({
      required_error: 'message is required',
    }),
    senderId: z.string({
      required_error: 'senderId is required',
    }),
    receiverId: z.string({
      required_error: 'receiverId is required',
    }),
    conversationId: z.string({
      required_error: 'conversationId is required',
    }),
  }),
});

const updateMessage = z.object({
  body: z.object({
    message: z.string().optional(),
    senderId: z.string().optional(),
    receiverId: z.string().optional(),
    conversationId: z.string().optional(),
  }),
});

export const MessageValidation = {
  createMessage,
  updateMessage,
};
