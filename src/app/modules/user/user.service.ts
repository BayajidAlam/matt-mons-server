import {
  Admin,
  Customer,
  Prisma,
  Seller,
  SellsManager,
  SuperAdmin,
  User,
  UserRole,
} from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUserFilters } from './user.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { userSearchableFields } from './user.constant';
import config from '../../../config';


// get all users
const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { searchTerm, role } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (role) {
    andConditions.push({
      role: role,
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
    include: {
      superAdmin: true,
      admin: true,
      seller: true,
      sellsManager: true,
      customer: true,
    },
  });

  const total = await prisma.user.count({
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


const createSuperAdmin = async (
  userData: User,
  superAdminData: SuperAdmin
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.role = UserRole.super_admin;

  const result = await prisma.$transaction(async prisma => {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: UserRole.super_admin,
        superAdmin: {
          create: {
            ...superAdminData,
          },
        },
      },
      include: {
        superAdmin: true,
      },
    });

    return user;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// create admin
const createAdmin = async (
  userData: User,
  adminData: Admin
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.role = UserRole.admin;

  const result = await prisma.$transaction(async prisma => {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: UserRole.admin,
        admin: {
          create: {
            ...adminData,
          },
        },
      },
      include: {
        admin: true,
      },
    });

    return user;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// create seller
const createSeller = async (
  userData: User,
  sellerData: Seller
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.role = UserRole.seller;

  const result = await prisma.$transaction(async prisma => {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: UserRole.seller,
        seller: {
          create: {
            ...sellerData,
          },
        },
      },
      include: {
        seller: true,
      },
    });

    return user;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create Seller');
  }

  return result;
};

// create sellsManager
const createSellsManager = async (
  userData: User,
  sellsManagerData: SellsManager
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.role = UserRole.sells_manager;

  const result = await prisma.$transaction(async prisma => {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: UserRole.sells_manager,
        sellsManager: {
          create: {
            ...sellsManagerData,
          },
        },
      },
      include: {
        sellsManager: true,
      },
    });

    return user;
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to Create Sells Manager'
    );
  }

  return result;
};

// create sellsManager
const createCustomer = async (
  userData: User,
  customerData: Customer
): Promise<User | null> => {

  
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );

  userData.role = UserRole.customer;

  const result = await prisma.$transaction(async prisma => {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: UserRole.customer,
        customer: {
          create: {
            ...customerData,
          },
        },
      },
      include: {
        customer: true,
      },
    });

    return user;
  });

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to Create Sells Manager'
    );
  }

  return result;
};

export const UserService = {
  createSuperAdmin,
  createAdmin,
  createSeller,
  createSellsManager,
  createCustomer,
  getAllUsers,
};
