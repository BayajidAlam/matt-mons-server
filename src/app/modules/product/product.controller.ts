import { Product } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { createProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  
  const ProductData = req.body;
  const result = await createProductService.createProduct(ProductData);

  sendResponse<Product>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product created Successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
