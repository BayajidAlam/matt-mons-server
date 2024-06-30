import { Category } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CategoryService } from './category.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { categoryFilterableFields } from './category.constant';

// get all
const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, categoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  console.log(filters, paginationOptions);
  const result = await CategoryService.getAllCategory(
    filters,
    paginationOptions
  );

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const shopData = req.body;
  const result = await CategoryService.createCategory(shopData);

  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created Successfully',
    data: result,
  });
});

// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.getSingle(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await CategoryService.updateSingle(id, data);

  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Updated Successfully',
    data: result,
  });
});

// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.deleteSingle(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingle,
  updateSingle,
  deleteSingle,
};
