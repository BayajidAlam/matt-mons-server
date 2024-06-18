import {  ProductTags } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { createProductTagsService } from './ProductTags.service';

const createProductTags = catchAsync(async (req: Request, res: Response) => {

  const ProductTagsData = req.body;
  const result = await createProductTagsService.createProductTags(ProductTagsData);

  sendResponse<ProductTags>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Tags created Successfully',
    data: result,
  });
});

export const ProductTagsController = {
  createProductTags,
};
