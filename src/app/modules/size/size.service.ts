import { Color, Prisma, Size } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ISizeFilters } from './size.interface';
import { SizeSearchableFields } from './size.constant';

// get all users
const getAll = async (
  filters: ISizeFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Color[]>> => {

  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: SizeSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.SizeWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.size.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.size.count({
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
const create = async (
  productColorData: Size
): Promise<Color | null> => {
  const result = await prisma.size.create({
    data: productColorData,
  });

  return result;
};

// get single
const getSingle = async (id: string): Promise<Size | null> => {
  const result = await prisma.size.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Size>
): Promise<Size | null> => {
  // check is exist
  const isExist = await prisma.size.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size Not Found');
  }

  const result = await prisma.size.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Size');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<Size | null> => {
  // check is exist
  const isExist = await prisma.size.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size Not Found');
  }

  const result = await prisma.size.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ProductSizeService = {
  create,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
