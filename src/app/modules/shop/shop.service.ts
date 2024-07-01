import { Prisma, Shop } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { shopSearchableFields } from './shop.constant';
import { IShopFilters } from './shop.interface';

// get all
const getAll = async (
  filters: IShopFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Shop[]>> => {

  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: shopSearchableFields.map(field => ({
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

  const whereConditions: Prisma.ShopWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.shop.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.shop.count({
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
const createShop = async (shopData: Shop): Promise<Shop | null> => {
  const isSellerExist = await prisma.seller.findUnique({
    where: {
      id: shopData.sellerId,
    },
  });

  if (!isSellerExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller does not exist!');
  }

  const result = await prisma.shop.create({
    data: shopData,
  });

  const shopWithSeller = await prisma.shop.findUnique({
    where: {
      id: result.id,
    },
    include: {
      seller: true,
    },
  });

  return shopWithSeller;
};

// get single
const getSingle = async (id: string): Promise<Shop | null> => {
  const result = await prisma.shop.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Shop>
): Promise<Shop | null> => {
  // check is exist
  const isExist = await prisma.shop.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shop Not Found');
  }

  const result = await prisma.shop.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Shop');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<Shop | null> => {
  // check is exist
  const isExist = await prisma.shop.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shop Not Found');
  }

  const result = await prisma.shop.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ShopService = {
  getAll,
  createShop,
  getSingle,
  updateSingle,
  deleteSingle,
};
