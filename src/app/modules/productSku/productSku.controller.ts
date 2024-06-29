import { ProductSku } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProductSkuService } from './productSku.service';
import pick from '../../../shared/pick';
import { productSkuFilterableFields } from './productSku.constant';
import { paginationFields } from '../../../constaints/pagination';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productSkuFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductSkuService.getAll(filters, paginationOptions);

  sendResponse<ProductSku[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Sku retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createProductSku = catchAsync(async (req: Request, res: Response) => {
  const ProductSkuData = req.body;
  const result = await ProductSkuService.createProductSku(ProductSkuData);

  sendResponse<ProductSku>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Sku created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductSkuService.getSingle(id);

  sendResponse<ProductSku>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sku retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ProductSkuService.updateSingle(id, data);

  sendResponse<ProductSku>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Sku Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductSkuService.deleteSingle(id);

  sendResponse<ProductSku>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sku Deleted successfully',
    data: result,
  });
});

export const ProductSkuController = {
  createProductSku,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
