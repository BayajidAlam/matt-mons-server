import { Shop } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createShop = async (shopData: Shop): Promise<Shop | null> => {
  const isSellerExist = await prisma.seller.findUnique({
    where: {
      id: shopData.sellerId,
    },
  });

  if (!isSellerExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller does not exist!');
  }

  const result = await prisma.shop.create({
    data: shopData,
  })

  const shopWithSeller = await prisma.shop.findUnique({
    where: {
      id: result.id,
    },
    include: {
      seller: true, 
    },
  });

  return shopWithSeller;
};

export const ShopService = {
  createShop,
};
