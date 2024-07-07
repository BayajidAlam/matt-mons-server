import { Color, PaymentMode, Prisma, ProductSku } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaymentModeFilters } from './paymentMode.interface';
import { PayModeFilterableFields } from './paymentMode.constant';

// get all users
const getAll = async (
  shopId: string,
  filters: IPaymentModeFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<PaymentMode[]>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.PaymentModeWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: PayModeFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.ColorWhereInput =
    andConditions.length > 1 ? { AND: andConditions } : andConditions[0];

  const result = await prisma.color.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.color.count({
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

//create
const createColor = async (
  productColorData: ProductSku
): Promise<Color | null> => {
  const result = await prisma.color.create({
    data: productColorData,
  });

  return result;
};

// get single
const getSingle = async (id: string): Promise<Color | null> => {
  const result = await prisma.color.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Color>
): Promise<Color | null> => {
  // check is exist
  const isExist = await prisma.color.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color Not Found');
  }

  const result = await prisma.color.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Color');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<Color | null> => {
  // check is exist
  const isExist = await prisma.color.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Color Not Found');
  }

  const result = await prisma.color.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PaymentModeService = {
  createColor,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
