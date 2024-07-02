import { Prisma, Product } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IProductFilters } from './product.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { productsSearchableFields } from './product.constant';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

// get all
const getAll = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: productsSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => {
        if (field === 'isAvailable') {
          return { [field]: value };
        }
        return { [field]: value };
      }),
    });
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    include: {
      ProductSku: true,
      Category: true,
      Shop: true,
    },
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.product.count({
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

const createProduct = async (ProductData: Product): Promise<Product | null> => {
  const moneySaved =
    Number(ProductData.minPrice) - Number(ProductData.discountPrice);
  const discountPercentage = (moneySaved / Number(ProductData.minPrice)) * 100;

  ProductData.moneySaved = String(moneySaved);
  ProductData.discountPercentage = String(discountPercentage);

  console.log(ProductData, 'Product Data');

  const result = await prisma.product.create({
    data: ProductData,
    include: {
      Category: true,
      ProductSku: true,
      Shop: true,
    },
  });

  return result;
};

export const ProductService = {
  createProduct,
  getAll,
};
