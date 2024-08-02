import { WishList } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constaints/pagination';
import { WishListFilterableFields } from './wishlist.constant';
import { WishlistService } from './wishlist.service';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {

  const { userId, ...WishlistData } = req.query;

  const filters = pick(WishlistData, WishListFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await WishlistService.getAll(
    userId as string,
    filters,
    paginationOptions
  );

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

//create
const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const WishlistData = req.body;
  const result = await WishlistService.createWishlist(WishlistData);

  sendResponse<WishList>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Wishlist created Successfully',
    data: result,
  });
});


// delete
const deleteSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await WishlistService.deleteSingle(id);

  sendResponse<WishList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WishList Deleted successfully',
    data: result,
  });
});

export const WishlistController = {
  createWishlist,
  getAll,
  deleteSingle
};
