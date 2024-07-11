import { Cart, Prisma, UserRole } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ICartFilters } from './cart.interface';
import { CartSearchableFields } from './cart.constant';
import prisma from '../../../shared/prisma';

// get all users
const getAll = async (
  userId: string,
  filters: ICartFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<any>> => {
  const { searchTerm } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.CartWhereInput[] = [{ userId }];

  if (searchTerm) {
    andConditions.push({
      OR: CartSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.CartWhereInput =
    andConditions.length > 1 ? { AND: andConditions } : andConditions[0];

  const cartItems = await prisma.cart.findMany({
    where: whereConditions,
    include: {
      Product: {
        select: {
          id: true,
          minPrice: true,
          discountPrice: true,
          productMainImage: true,
          discountPercentage: true,
          moneySaved: true,
          productName: true,
          Shop: {
            select: {
              shopName: true,
            },
          },
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.cart.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / limit);

  const subTotal = cartItems?.reduce(
    (total, item) => total + Number(item.Product.discountPrice) * item.quantity,
    0
  );
  const shipping = 90;
  const taxAmount = 0;
  const totalPayAble = subTotal + shipping + taxAmount;

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: {
      cartItems,
      subTotal,
      shipping,
      taxAmount,
      total: totalPayAble,
    },
  };
};

//create
const createCart = async (CartData: Cart): Promise<Cart | null> => {
  const isCustomer = await prisma.user.findUnique({
    where: {
      id: CartData.userId,
    },
  });
  if (isCustomer?.role != UserRole.customer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You can not add to cart');
  }

  const isSameProductAddedToCart = await prisma.cart.findFirst({
    where: {
      productId: CartData.productId,
      userId: CartData.userId,
    },
  });

  if (isSameProductAddedToCart) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This product is already added');
  }

  const result = await prisma.cart.create({
    data: CartData,
  });

  return result;
};

// get single
const getSingle = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.findUnique({
    where: {
      id,
    },
  });
  return result;
};

//update or increment quantity
const incrementQuantity = async (id: string): Promise<Cart | null> => {
  const cartItem = await prisma.cart.findUnique({
    where: {
      id,
    },
  });

  if (!cartItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart Not Found');
  }

  const updatedCartItem = await prisma.cart.update({
    where: {
      id,
    },
    data: {
      quantity: cartItem.quantity + 1,
    },
  });

  if (!updatedCartItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Cart');
  }

  return updatedCartItem;
};

// update or decrement quantity
const decrementQuantity = async (id: string): Promise<Cart | null> => {
  const cartItem = await prisma.cart.findUnique({
    where: {
      id,
    },
  });

  if (!cartItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart Not Found');
  }

  if (cartItem.quantity <= 1) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Cannot decrement quantity below 1'
    );
  }

  const updatedCartItem = await prisma.cart.update({
    where: {
      id,
    },
    data: {
      quantity: cartItem.quantity - 1,
    },
  });

  if (!updatedCartItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Cart');
  }

  return updatedCartItem;
};

// delete single
const deleteSingle = async (id: string): Promise<Cart | null> => {
  // check is exist
  const isExist = await prisma.cart.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart Not Found');
  }

  const result = await prisma.cart.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CartService = {
  createCart,
  getAll,
  getSingle,
  incrementQuantity,
  decrementQuantity,
  deleteSingle,
};
