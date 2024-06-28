import { Size } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { ProductSizeService } from './size.service';
import { SizeFilterableFields } from './size.constant';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SizeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductSizeService.getAll(filters, paginationOptions);

  sendResponse<Size[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const create = catchAsync(async (req: Request, res: Response) => {
  const ProductSizeData = req.body;
  const result = await ProductSizeService.create(ProductSizeData);

  sendResponse<Size>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Size created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductSizeService.getSingle(id);

  sendResponse<Size>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ProductSizeService.updateSingle(id, data);

  sendResponse<Size>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Size Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductSizeService.deleteSingle(id);

  sendResponse<Size>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size Deleted successfully',
    data: result,
  });
});

export const SizeController = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
