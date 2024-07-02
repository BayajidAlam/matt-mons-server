import prisma from '../../../shared/prisma';
import { Coupon, Prisma } from '@prisma/client';
import { ICouponFilters } from './cupon.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { couponSearchableFields } from './cupon.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// get all
const getAll = async (
  shopId: string,
  filters: ICouponFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Coupon[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.CouponWhereInput[] = [{ shopId }];

  if (searchTerm) {
    andConditions.push({
      OR: couponSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions: Prisma.CouponWhereInput = {
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    };
    andConditions.push(filterConditions);
  }

  const whereConditions: Prisma.CouponWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.coupon.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.coupon.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

//create Coupon
const createCoupon = async (CouponData: Coupon): Promise<Coupon | null> => {
  const isShopExist = await prisma.shop.findUnique({
    where: {
      id: CouponData?.shopId,
    },
  });

  if (!isShopExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shop Not Found');
  }

  const result = await prisma.coupon.create({
    data: CouponData,
  });

  return result;
};

// get single
const getSingle = async (id: string): Promise<Coupon | null> => {
  const result = await prisma.coupon.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Coupon>
): Promise<Coupon | null> => {
  // check is exist
  const isExist = await prisma.coupon.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coupon Not Found');
  }

  const result = await prisma.coupon.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Coupon');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<Coupon | null> => {
  // check is exist
  const isExist = await prisma.coupon.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Coupon Not Found');
  }

  const result = await prisma.coupon.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CouponService = {
  createCoupon,
  getSingle,
  getAll,
  updateSingle,
  deleteSingle,
};
