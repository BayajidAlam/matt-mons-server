import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Order } from '@prisma/client';
import { paginationFields } from '../../../constaints/pagination';
import pick from '../../../shared/pick';
import { orderFilterableFields } from './order.constant';
import { OrderService } from './order.service';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const { userId, ...orderData } = req.query;

  const filters = pick(orderData, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await OrderService.getAll(
    userId as string,
    filters,
    paginationOptions
  );

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);

  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await OrderService.getSingle(id);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

// // update single
// const updateSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;

//   const result = await HelperService.updateSingle(id, data);

//   sendResponse<Helper>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Helper Updated Successfully',
//     data: result,
//   });
// });

// // inactive
// const inactive = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await HelperService.inactive(id);

//   sendResponse<Helper>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Helper Inactive successfully',
//     data: result,
//   });
// });

export const OrderController = {
  getSingle,
  getAll,
  createOrder,
};
