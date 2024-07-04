import { Cart } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { CartFilterableFields } from './cart.constant';
import { CartService } from './cart.service';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  
  const { userId, ...CartData } = req.query;
  const filters = pick(CartData, CartFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CartService.getAll(
    userId as string,
    filters,
    paginationOptions
  );

  sendResponse<Cart[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createCart = catchAsync(async (req: Request, res: Response) => {
  
  const CartData = req.body;
  const result = await CartService.createCart(CartData);

  sendResponse<Cart>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CartService.getSingle(id);

  sendResponse<Cart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await CartService.updateSingle(id, data);

  sendResponse<Cart>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cart Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CartService.deleteSingle(id);

  sendResponse<Cart>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart Deleted successfully',
    data: result,
  });
});

export const CartController = {
  createCart,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
