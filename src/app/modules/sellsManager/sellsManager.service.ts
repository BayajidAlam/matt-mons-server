import prisma from '../../../shared/prisma';
import { Prisma, SellsManager } from '@prisma/client';
import { ISellsManagerFilters } from './sellsManager.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { sellsManagerSearchableFields } from './sellsManager.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// get all
const getAll = async (
  shopId: string,
  filters: ISellsManagerFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<SellsManager[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.SellsManagerWhereInput[] = [{ shopId }];

  if (searchTerm) {
    andConditions.push({
      OR: sellsManagerSearchableFields.map(field => ({
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

  const whereConditions: Prisma.SellsManagerWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.sellsManager.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: { user: true },
    skip,
    take: limit,
  });

  const total = await prisma.sellsManager.count({
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
const getSingle = async (id: string): Promise<SellsManager | null> => {
  const result = await prisma.sellsManager.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<SellsManager>
): Promise<SellsManager | null> => {
  // check is exist
  const isExist = await prisma.sellsManager.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Helper Not Found');
  }

  const result = await prisma.sellsManager.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Helper');
  }

  return result;
};

const deleteSingle = async (id: string): Promise<SellsManager | null> => {
  return await prisma.$transaction(async prisma => {
    // Check if the SellsManager exists
    const isExist = await prisma.sellsManager.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Sells Manager Not Found');
    }

    // Delete the SellsManager
    const result = await prisma.sellsManager.delete({
      where: {
        id,
      },
    });

    // Delete the associated User
    await prisma.user.delete({
      where: {
        id: isExist.userId,
      },
    });

    return result;
  });
};

export const SellsManagerService = {
  getSingle,
  getAll,
  updateSingle,
  deleteSingle,
};
