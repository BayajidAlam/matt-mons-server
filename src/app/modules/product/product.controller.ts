import { Product } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { productsFilterableFields } from './product.constant';
import { paginationFields } from '../../../constaints/pagination';
import { ProductService } from './product.service';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const { shopId, ...filterData } = req.query;

  const filters = pick(filterData, productsFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await ProductService.getAll(
    shopId as string,
    filters,
    paginationOptions
  );

  sendResponse<Product[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const ProductData = req.body;

  const result = await ProductService.createProduct(ProductData);

  sendResponse<Product>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductService.getSingle(id);

  sendResponse<Product>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await ProductService.updateSingle(id, data);

  sendResponse<Product>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ProductService.deleteSingle(id);

  sendResponse<Product>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
