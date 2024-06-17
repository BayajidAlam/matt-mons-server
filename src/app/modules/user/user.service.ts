import { Admin, Prisma, SuperAdmin, User, UserRole } from '@prisma/client';
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
const createAdmin = async (user: User, admin: Admin): Promise<User | null> => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  user.role = UserRole.admin;

  const result = await prisma.user.create({
    data: { ...user, admin: { create: admin } },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all
const getAll = async (
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
      driver: true,
      helper: true,
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

export const UserService = {
  createSuperAdmin,
  createAdmin,
  getAll,
};
