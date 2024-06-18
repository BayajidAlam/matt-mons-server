import {  ProductSku } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { createProductSkuService } from './productSku.service';

const createProductSku = catchAsync(async (req: Request, res: Response) => {

  const ProductSkuData = req.body;
  const result = await createProductSkuService.createProductSku(ProductSkuData);

  sendResponse<ProductSku>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Sku created Successfully',
    data: result,
  });
});

export const ProductSkuController = {
  createProductSku,
};
