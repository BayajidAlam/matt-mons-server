import { Prisma, ProductSku } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IProductFilters } from '../product/product.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { productSkuSearchableFields } from './productSku.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ExtendedProductSkuWhereInput } from './productSku.interface';


// get all
const getAll = async (
  shopId: string,
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ProductSku[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: ExtendedProductSkuWhereInput[] = [{ shopId }];

  if (searchTerm) {
    andConditions.push({
      OR: productSkuSearchableFields.map(field => {
        if (field === 'availableColor' || field === 'availableSize') {
          return {
            [field]: {
              has: searchTerm,
            },
          };
        } else {
          return {
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          };
        }
      }),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]:
          typeof value === 'string'
            ? value === 'true'
              ? true
              : value === 'false'
              ? false
              : value
            : value,
      })),
    });
  }

  // Correctly typed whereConditions for ProductSku
  const whereConditions: Prisma.ProductSkuWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.productSku.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.productSku.count({
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
const createProductSku = async (
  ProductSkuData: ProductSku
): Promise<ProductSku | null> => {
  const result = await prisma.productSku.create({
    data: ProductSkuData,
  });

  return result;
};

// get single
const getSingle = async (id: string): Promise<ProductSku | null> => {
  const result = await prisma.productSku.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<ProductSku>
): Promise<ProductSku | null> => {
  // check is exist
  const isExist = await prisma.productSku.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sku Not Found');
  }

  const result = await prisma.productSku.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Sku');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<ProductSku | null> => {
  // check is exist
  const isExist = await prisma.productSku.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sku Not Found');
  }

  const result = await prisma.productSku.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ProductSkuService = {
  createProductSku,
  getAll,
  getSingle,
  updateSingle,
  deleteSingle,
};
