import { PayModeFilterableFields } from './paymentMode.constant';
import { PaymentMode } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { PaymentModeService } from './paymentMode.service';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  
  const { shopId, ...payModeData } = req.query;
  const filters = pick(payModeData, PayModeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PaymentModeService.getAll(
    shopId as string,
    filters,
    paginationOptions
  );

  sendResponse<PaymentMode[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentMode retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createColor = catchAsync(async (req: Request, res: Response) => {
  const payModeData = req.body;
  const result = await PaymentModeService.createColor(payModeData);

  sendResponse<PaymentMode>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'PaymentMode created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PaymentModeService.getSingle(id);

  sendResponse<PaymentMode>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentMode retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await PaymentModeService.updateSingle(id, data);

  sendResponse<PaymentMode>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'PaymentMode Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PaymentModeService.deleteSingle(id);

  sendResponse<PaymentMode>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PaymentMode Deleted successfully',
    data: result,
  });
});

export const PayModeController = {
  createColor,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
