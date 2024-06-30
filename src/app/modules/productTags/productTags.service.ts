import { Prisma, ProductTags } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IProductTagsFilters } from './ProductTags.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { productTagsSearchableFields } from './productTags.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// get all
const getAll = async (
  filters: IProductTagsFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ProductTags[]>> => {

  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: productTagsSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }


  const whereConditions: Prisma.ProductTagsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.productTags.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.productTags.count({
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
const createProductTags = async (
  ProductTagsData: ProductTags
): Promise<ProductTags | null> => {
  const result = await prisma.productTags.create({
    data: ProductTagsData,
  });

  return result;
};

// get single
const getSingle = async (id: string): Promise<ProductTags | null> => {
  const result = await prisma.productTags.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<ProductTags>
): Promise<ProductTags | null> => {
  // check is exist
  const isExist = await prisma.productTags.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tags Not Found');
  }

  const result = await prisma.productTags.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Tags');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<ProductTags | null> => {
  // check is exist
  const isExist = await prisma.productTags.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sku Not Found');
  }

  const result = await prisma.productTags.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ProductTagsService = {
  getAll,
  createProductTags,
  getSingle,
  updateSingle,
  deleteSingle,
};
