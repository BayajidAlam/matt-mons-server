import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Order, OrderStatus } from '@prisma/client';
import { paginationFields } from '../../../constaints/pagination';
import pick from '../../../shared/pick';
import { orderFilterableFields } from './order.constant';
import { OrderService } from './order.service';
import { IOrderResponse } from './order.interface';

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

// get all orders of a shop
const getAllSellsOrder = catchAsync(async (req: Request, res: Response) => {
  const { shopId, orderStatus, ...orderData } = req.query;

  const filters = pick(orderData, orderFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await OrderService.getAllSellsOrder(
    shopId as string,
    orderStatus as OrderStatus,
    filters,
    paginationOptions
  );

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sells orders retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrder(orderData);

  sendResponse<IOrderResponse>(res, {
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

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await OrderService.updateSingle(id, data);

  sendResponse<Order>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order Updated Successfully',
    data: result,
  });
});

export const OrderController = {
  getSingle,
  getAll,
  getAllSellsOrder,
  createOrder,
  updateSingle,
};
