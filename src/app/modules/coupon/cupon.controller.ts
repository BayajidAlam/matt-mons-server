import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Coupon } from '@prisma/client';
import { CouponService } from './cupon.service';
import { couponFilterableFields } from './cupon.constant';
import { paginationFields } from '../../../constaints/pagination';
import pick from '../../../shared/pick';

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const { shopId, ...couponData } = req.query;
  const filters = pick(couponData, couponFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CouponService.getAll(
    shopId as string,
    filters,
    paginationOptions
  );

  sendResponse<Coupon[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupons retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const shopData = req.body;
  const result = await CouponService.createCoupon(shopData);

  sendResponse<Coupon>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Coupon created Successfully',
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
    message: 'coupon retrieved successfully',
    data: result,
  });
});

// get single by title
const getCouponByTitle = catchAsync(async (req: Request, res: Response) => {
  const couponName = req.query.couponName;
  const result = await CouponService.getCouponByTitle(
    couponName as string
  );

  sendResponse<Coupon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon retrieved successfully',
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

export const CouponController = {
  createCoupon,
  getAll,
  getSingle,
  getCouponByTitle,
  updateSingle,
  deleteSingle,
};
