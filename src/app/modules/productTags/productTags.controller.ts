import { ProductTags } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { productTagsFilterableFields } from './productTags.constant';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { ProductTagsService } from './ProductTags.service';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productTagsFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductTagsService.getAll(filters, paginationOptions);

  sendResponse<ProductTags[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product tag retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createProductTags = catchAsync(async (req: Request, res: Response) => {
  const ProductTagsData = req.body;
  const result = await ProductTagsService.createProductTags(ProductTagsData);

  sendResponse<ProductTags>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Tags created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductTagsService.getSingle(id);

  sendResponse<ProductTags>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product tag retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ProductTagsService.updateSingle(id, data);

  sendResponse<ProductTags>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product tag Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductTagsService.deleteSingle(id);

  sendResponse<ProductTags>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product tag Deleted successfully',
    data: result,
  });
});

export const ProductTagsController = {
  getAll,
  createProductTags,
  getSingle,
  updateSingle,
  deleteSingle,
};
