import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
// import ApiError from '../../../errors/ApiError';
// import httpStatus from 'http-status';

const createCategory = async (CategoryData: Category): Promise<Category | null> => {

  const result = await prisma.category.create({
    data: CategoryData,
  })


  return result;
};

export const createCategoryService = {
  createCategory,
};
