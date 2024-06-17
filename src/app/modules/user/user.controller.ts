import { User } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';
import { paginationFields } from '../../../constaints/pagination';

// create super admin
const createSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const { superAdmin, ...userData } = req.body;
  const result = await UserService.createSuperAdmin(userData, superAdmin);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Super created Successfully',
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  console.log(req.body, 'body');
  const result = await UserService.createAdmin(userData, admin);

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created Successfully',
    data: result,
  });
});

// create seller
const createSeller = catchAsync(async (req: Request, res: Response) => {
  const { seller, ...userData } = req.body; 
  console.log(req.body, 'body');
  const result = await UserService.createSeller(userData, seller); 

  sendResponse<User>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Seller created successfully',
    data: result,
  });
});

// get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAll(filters, paginationOptions);

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  createSuperAdmin,
  createAdmin,
  createSeller,
  getAll,
};
