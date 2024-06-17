import { Message } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import {
  createMessageToDB,
  getAllMessageFromDB,
  getSingleMessageFromDB,
  updateSingleMessageToDB,
  deleteSingleMessageFromDB,
} from './message.service';
import pick from '../../../shared/pick';
import { messageFilterableFields } from './message.constant';
import { paginationFields } from '../../../constaints/pagination';


export const createMessage = catchAsync(async (req: Request, res: Response) => {
  const io = req.app.get('io');
  const user = req.user;

  const result = await createMessageToDB(user, req.body);

  io.emit('message', { ...result });

  sendResponse<Message>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Message created successfully',
    data: result,
  });
});

export const getAllMessage = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, messageFilterableFields);
  const pagination = pick(req.query, paginationFields);

  const result = await getAllMessageFromDB(filters, pagination);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Messages retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const getSingleMessage = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getSingleMessageFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single message fetched successfully',
      data: result,
    });
  }
);

export const updateSingleMessage = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await updateSingleMessageToDB(id, payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message updated successfully',
      data: result,
    });
  }
);

export const deleteSingleMessage = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteSingleMessageFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message deleted successfully',
      data: result,
    });
  }
);