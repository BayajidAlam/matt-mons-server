import { Color } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import {  ProductColorService } from './color.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { ColorFilterableFields } from './color.constant';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ColorFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductColorService.getAll(filters, paginationOptions);

  sendResponse<Color[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createColor = catchAsync(async (req: Request, res: Response) => {

  const ProductColorData = req.body;
  const result = await ProductColorService.createColor(ProductColorData);

  sendResponse<Color>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Color created Successfully',
    data: result,
  });
});

export const ColorsController = {
  createColor,
  getAll,
};
