import prisma from '../../../shared/prisma';
import { Coupon, Prisma } from '@prisma/client';
import { ICouponFilters } from './cupon.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { couponSearchableFields } from './cupon.constant';

// get all
const getAll = async (
  filters: ICouponFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Coupon[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

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
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    });
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

// get single
const getSingle = async (id: string): Promise<Coupon | null> => {
  const result = await prisma.coupon.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// // update single
// const updateSingle = async (
//   id: string,
//   payload: Partial<Helper>
// ): Promise<Helper | null> => {
//   // check is exist
//   const isExist = await prisma.helper.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Helper Not Found');
//   }

//   const result = await prisma.helper.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Helper');
//   }

//   return result;
// };

// // inactive
// const inactive = async (id: string): Promise<Helper | null> => {
//   // check is exist
//   const isExist = await prisma.helper.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Helper Not Found');
//   }

//   const result = await prisma.helper.update({
//     where: {
//       id,
//     },
//     data: { isActive: false },
//   });

//   return result;
// };

export const CouponService = {
  getSingle,
  getAll,
};