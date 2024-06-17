import { Shop } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { ShopService } from './shop.service';
import catchAsync from '../../../shared/catchAsync';

// create super admin
const createShop = catchAsync(async (req: Request, res: Response) => {
  const shopData = req.body;
  const result = await ShopService.createShop(shopData);

  sendResponse<Shop>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Shop created Successfully',
    data: result,
  });
});

export const ShopController = {
  createShop,
};
