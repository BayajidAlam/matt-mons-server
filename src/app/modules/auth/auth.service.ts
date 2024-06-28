import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { User, UserRole } from '@prisma/client';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

// login
const login = async (
  payload: Pick<User, 'email' | 'password'>
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      superAdmin: true,
      admin: true,
      seller: true,
      sellsManager: true,
      customer: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create access token and refresh token
  const { id, role, superAdmin, admin, seller, sellsManager, customer } =
    isUserExist;

  //get and add shop id to jwt
  const shop = await prisma.shop.findFirst({
    where: {
      sellerId: seller?.id as string,
    },
  });

  // add shop count of a seller to JWT
  let shopCount = 0;
  if (role === UserRole.seller) {
    const isShopExist = await prisma.shop.findMany({
      where: {
        sellerId: seller?.id,
      },
    });
    shopCount = isShopExist.length;
  }

  const accessToken = jwtHelpers.createToken(
    {
      id,
      role,
      email,
      shopCount,
      sellerId: seller?.id,
      shopId: shop?.id,
      fullName: superAdmin
        ? superAdmin?.fullName
        : admin
        ? admin.fullName
        : seller
        ? seller.fullName
        : sellsManager
        ? sellsManager?.fullName
        : customer?.fullName,
      profileImage: superAdmin
        ? superAdmin?.profileImg
        : admin
        ? admin.profileImg
        : seller
        ? seller.profileImg
        : sellsManager
        ? sellsManager?.profileImg
        : customer?.profileImg,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      id,
      role,
      email,
      shopCount,
      sellerId: seller?.id,
      shopId: shop?.id,
      fullName: superAdmin
        ? superAdmin?.fullName
        : admin
        ? admin.fullName
        : seller
        ? seller.fullName
        : sellsManager
        ? sellsManager?.fullName
        : customer?.fullName,
      profileImage: superAdmin
        ? superAdmin?.profileImg
        : admin
        ? admin.profileImg
        : seller
        ? seller.profileImg
        : sellsManager
        ? sellsManager?.profileImg
        : customer?.profileImg,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

// refresh token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { id } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      superAdmin: true,
      admin: true,
      seller: true,
      sellsManager: true,
      customer: true,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const { role, email, superAdmin, admin, seller, sellsManager, customer } =
    isUserExist;
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id,
      role,
      email,
      fullName: superAdmin
        ? superAdmin?.fullName
        : admin
        ? admin.fullName
        : seller
        ? seller.fullName
        : sellsManager
        ? sellsManager?.fullName
        : customer?.fullName,
      profileImage: superAdmin
        ? superAdmin?.profileImg
        : admin
        ? admin.profileImg
        : seller
        ? seller.profileImg
        : sellsManager
        ? sellsManager?.profileImg
        : customer?.profileImg,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  login,
  refreshToken,
};
