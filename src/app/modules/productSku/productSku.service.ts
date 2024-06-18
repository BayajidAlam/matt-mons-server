import { ProductSku } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createProductSku = async (
  ProductSkuData: ProductSku
): Promise<ProductSku | null> => {
  
  const result = await prisma.productSku.create({
    data: ProductSkuData,
  });

  return result;
};

export const createProductSkuService = {
  createProductSku,
};
