import { Conversation } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { conversationFilterableFields } from './conversation.constant';
import { paginationFields } from '../../../constaints/pagination';
import { ConversationService } from './conversation.service';

const createConversation = catchAsync(async (req: Request, res: Response) => {
  
  const io = req.app.get('io');

  const user = req.user;

  const result = await ConversationService.createConversationToDB(
    user,
    req.body
  );

  io.emit('conversation-message', { ...result });
  // io.emit('conversation', { ...result.conversation });
  // io.emit('message', { ...result.message });

  sendResponse<Conversation>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Conversation created successfully',
    data: result,
  });
});

const getAllConversation = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, conversationFilterableFields);
  const pagination = pick(req.query, paginationFields);

  const result = await ConversationService.getAllConversationFromDB(
    filters,
    pagination
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Conversations retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleConversation = catchAsync(
  async (req: Request, res: Response) => {

    const result = await ConversationService.getSingleConversationFromDB(
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single conversation fetched successfully',
      data: result,
    });
  }
);

const updateSingleConversation = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;
    const payload = req.body;

    const result = await ConversationService.updateSingleConversationToDB(
      id,
      payload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Conversation updated successfully',
      data: result,
    });
  }
);

const deleteSingleConversation = catchAsync(
  async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await ConversationService.deleteSingleConversationFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Conversation deleted successfully',
      data: result,
    });
  }
);

export const ConversationController = {
  createConversation,
  getAllConversation,
  updateSingleConversation,
  getSingleConversation,
  deleteSingleConversation,
};
