import { Category } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { createCategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const shopData = req.body;
  const result = await createCategoryService.createCategory(shopData);

  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created Successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
};
