import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { User, UserRole } from '@prisma/client';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {  Secret } from 'jsonwebtoken';
import {  ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

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

// const changePassword = async (
//   user: JwtPayload | null,
//   payload: IChangePassword
// ): Promise<void> => {
//   const { oldPassword, newPassword } = payload;

//   // checking is user exist
//   // const isUserExist = await User.isUserExist(user?.userId);

//   //alternative way
//   const isUserExist = await User.findOne({ id: user?.userId }).select(
//     '+password'
//   );

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }

//   // checking old password
//   if (
//     isUserExist.password &&
//     !(await User.isPasswordMatched(oldPassword, isUserExist.password))
//   ) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
//   }

//   // // hash password before saving
//   // const newHashedPassword = await bcrypt.hash(
//   //   newPassword,
//   //   Number(config.bycrypt_salt_rounds)
//   // );

//   // const query = { id: user?.userId };
//   // const updatedData = {
//   //   password: newHashedPassword,  //
//   //   needsPasswordChange: false,
//   //   passwordChangedAt: new Date(), //
//   // };

//   // await User.findOneAndUpdate(query, updatedData);
//   // data update
//   isUserExist.password = newPassword;
//   isUserExist.needsPasswordChange = false;

//   // updating using save()
//   isUserExist.save();
// };

// const forgotPassword = async (payload: { id: string }) => {

//   const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 });

//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist!")
//   }

//   let profile = null;
//   if (user.role === ENUM_USER_ROLE.ADMIN) {
//     profile = await Admin.findOne({ id: user.id })
//   }
//   else if (user.role === ENUM_USER_ROLE.FACULTY) {
//     profile = await Faculty.findOne({ id: user.id })
//   }
//   else if (user.role === ENUM_USER_ROLE.STUDENT) {
//     profile = await Student.findOne({ id: user.id })
//   }

//   if (!profile) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Pofile not found!")
//   }

//   if (!profile.email) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Email not found!")
//   }

//   const passResetToken = await jwtHelpers.createResetToken({ id: user.id }, config.jwt.secret as string, '50m')

//   const resetLink: string = config.resetlink + `token=${passResetToken}`

//   console.log("profile: ", profile)
//   await sendEmail(profile.email, `
//       <div>
//         <p>Hi, ${profile.name.firstName}</p>
//         <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
//         <p>Thank you</p>
//       </div>
//   `);

//   // return {
//   //   message: "Check your email!"
//   // }
// }

// const resetPassword = async (payload: { id: string, newPassword: string }, token: string) => {

//   const { id, newPassword } = payload;
//   const user = await User.findOne({ id }, { id: 1 })

//   if (!user) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "User not found!")
//   }

//   const isVarified = await jwtHelpers.verifyToken(token, config.jwt.secret as string);

//   const password = await bcrypt.hash(newPassword, Number(config.bycrypt_salt_rounds))

//   await User.updateOne({ id }, { password });
// }

export const AuthService = {
  login,
  refreshToken,
};

