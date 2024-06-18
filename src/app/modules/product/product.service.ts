import { Product } from '@prisma/client';
import prisma from '../../../shared/prisma';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const createProduct = async (ProductData: Product): Promise<Product | null> => {
  console.log(ProductData, 'Product Data');

  const result = await prisma.product.create({
    data: ProductData,
    include: {
      Category: true,
      ProductSku: true,
    },
  });

  return result;
};

export const createProductService = {
  createProduct,
};
