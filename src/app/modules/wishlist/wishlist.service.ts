import { Prisma, UserRole, WishList } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { IWishlistFilters } from './wishlist.interface';
import { WishListSearchableFields } from './wishlist.constant';

// get all users
const getAll = async (
  userId: string,
  filters: IWishlistFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<any>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.WishListWhereInput[] = [{ userId }];

  if (searchTerm) {
    andConditions.push({
      OR: WishListSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.WishListWhereInput =
    andConditions.length > 1 ? { AND: andConditions } : andConditions[0];

  const wishlistItems = await prisma.wishList.findMany({
    where: whereConditions,
    include: {
      Product: {
        select: {
          id: true,
          productName: true,
          productMainImage: true,
          discountPrice: true,
          moneySaved: true,
          discountPercentage: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.wishList.count({
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
    data: {
      wishlistItems,
    },
  };
};

//create
const createWishlist = async (wishlistData: WishList): Promise<any | null> => {
  const isCustomer = await prisma.user.findUnique({
    where: {
      id: wishlistData.userId,
    },
  });

  if (isCustomer?.role != UserRole.customer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You can not add to wishlist');
  }

  const isSameProductAddedToWishlist = await prisma.wishList.findFirst({
    where: {
      productId: wishlistData.productId,
      userId: wishlistData.userId,
    },
  });

  if (isSameProductAddedToWishlist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This product is already added');
  }

  const result = await prisma.wishList.create({
    data: wishlistData,
  });

  return result;
};

// delete single
const deleteSingle = async (id: string): Promise<WishList | null> => {
  // check is exist
  const isExist = await prisma.wishList.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wishlist Not Found');
  }

  const result = await prisma.wishList.delete({
    where: {
      id,
    },
  });

  return result;
};

export const WishlistService = {
  createWishlist,
  getAll,
  deleteSingle,
};
