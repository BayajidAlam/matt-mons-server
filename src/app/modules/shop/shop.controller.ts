import { Shop } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ShopService } from './shop.service';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { shopFilterableFields } from './shop.constant';
import { paginationFields } from '../../../constaints/pagination';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, shopFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ShopService.getAll(filters, paginationOptions);

  sendResponse<Shop[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shops retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// create
const createShop = catchAsync(async (req: Request, res: Response) => {
  const shopData = req.body;
  console.log(shopData, 'shop data');
  const result = await ShopService.createShop(shopData);

  sendResponse<Shop>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Shop created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ShopService.getSingle(id);

  sendResponse<Shop>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ShopService.updateSingle(id, data);

  sendResponse<Shop>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Shop Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ShopService.deleteSingle(id);

  sendResponse<Shop>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shop Deleted successfully',
    data: result,
  });
});

export const ShopController = {
  createShop,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
