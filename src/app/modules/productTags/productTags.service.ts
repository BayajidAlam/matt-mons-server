import { ProductTags } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createProductTags = async (
  ProductTagsData: ProductTags
): Promise<ProductTags | null> => {
  
  const result = await prisma.productTags.create({
    data: ProductTagsData,
  });

  return result;
};

export const createProductTagsService = {
  createProductTags,
};
