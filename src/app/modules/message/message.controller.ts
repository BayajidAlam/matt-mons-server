import { Message } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { messageFilterableFields } from './message.constant';
import { paginationFields } from '../../../constaints/pagination';
import { MessageService } from './message.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const io = req.app.get('io');
  const user = req.user;

  const result = await MessageService.createMessage(user, req.body);

  io.emit('message', { ...result });

  sendResponse<Message>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message created successfully',
    data: result,
  });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, messageFilterableFields);
  const pagination = pick(req.query, paginationFields);

  const result = await MessageService.getAll(filters, pagination);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Messages retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageService.getSingleMessage(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single message fetched successfully',
    data: result,
  });
});

const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await MessageService.updateSingle(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message updated successfully',
    data: result,
  });
});

const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MessageService.deleteSingle(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message deleted successfully',
    data: result,
  });
});

export const MessageController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
