import { Prisma, Product } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IProductFilters } from './product.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { productsSearchableFields } from './product.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// get all
const getAll = async (
  shopId: string,
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.ProductWhereInput[] = [{ shopId }];

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
    const filterConditions: Prisma.ProductWhereInput[] = Object.entries(
      filterData
    ).map(([field, value]) => ({
      [field]: value,
    }));

    andConditions.push({
      AND: filterConditions,
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

const getAllTodayBestSell = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { searchTerm } = filters;
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

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    select: {
      id: true,
      productName: true,
      productMainImage: true,
      productTags: true,
      discountPrice: true,
      Shop: {
        select: {
          shopName: true,
        },
      },
      ReviewAndRatings: true,
    },
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

const getAllFeedProduct = async (
  filters: IProductFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Product[]>> => {
  const { searchTerm } = filters;
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

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    select: {
      id: true,
      productName: true,
      productMainImage: true,
      productTags: true,
      discountPrice: true,
      Shop: {
        select: {
          shopName: true,
        },
      },
      ReviewAndRatings: true,
    },
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

const getMostSoldProductsByCategory = async () => {
  const categories = await prisma.category.findMany({
    include: {
      Product: {
        select: {
          id: true,
          productName: true,
          productMainImage: true,
          productTags: true,
          discountPrice: true,
          Shop: {
            select: {
              shopName: true,
            },
          },
          ReviewAndRatings: true,
        },
        orderBy: {
          sellCount: 'desc',
        },
        take: 1,
      },
    },
  });

  const categoriesWithProducts = categories.filter(
    category => category.Product.length > 0
  );

  const mostSoldProducts = categoriesWithProducts.map(
    category => category.Product[0]
  );

  return {
    meta: {
      total: mostSoldProducts.length,
    },
    data: mostSoldProducts,
  };
};

const createProduct = async (ProductData: Product): Promise<Product | null> => {
  const moneySaved =
    Number(ProductData.minPrice) - Number(ProductData.discountPrice);
  const discountPercentage = (moneySaved / Number(ProductData.minPrice)) * 100;

  ProductData.moneySaved = String(moneySaved);
  ProductData.discountPercentage = String(discountPercentage);

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

// get single
const getSingle = async (id: string): Promise<Product | null> => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      Category: true,
      ProductSku: true,
      Shop: true,
      ReviewAndRatings: true,
    },
  });
  return result;
};

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Product>
): Promise<Product | null> => {
  // check is exist
  const isExist = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found');
  }

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Product');
  }

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<Product | null> => {
  // check is exist
  const isExist = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found');
  }

  const result = await prisma.product.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ProductService = {
  createProduct,
  getAll,
  getAllTodayBestSell,
  getAllFeedProduct,
  getMostSoldProductsByCategory,
  getSingle,
  updateSingle,
  deleteSingle,
};
