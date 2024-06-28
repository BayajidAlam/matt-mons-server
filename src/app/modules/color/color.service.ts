import { Color, Prisma, ProductSku } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IProductFilters } from '../product/product.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ColorSearchableFields } from './color.constant';

// get all
const getAll = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ProductSku[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ColorSearchableFields.map(field => {
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
const createColor = async (
  productColorData: ProductSku
): Promise<Color | null> => {
  const result = await prisma.color.create({
    data: productColorData,
  });

  return result;
};

export const ProductColorService = {
  createColor,
  getAll,
};
