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
  const filters = pick(req.query, productsFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await ProductService.getAll(filters, paginationOptions);

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
  console.log(ProductData, 'data');
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

  const result = await CouponService.getSingle(id);

  sendResponse<Coupon>(res, {
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

  const result = await CouponService.updateSingle(id, data);

  sendResponse<Coupon>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CouponService.deleteSingle(id);

  sendResponse<Coupon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon Deleted successfully',
    data: result,
  });
});


export const ProductController = {
  createProduct,
  getAll,
};
