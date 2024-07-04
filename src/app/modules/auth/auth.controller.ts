import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

// login
const login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await AuthService.login(data);

  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: parseInt(config.jwt.cookie_max_age || '31536000000'),
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successfully!',
    data: others,
  });
});

// logout
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken');

  sendResponse<string>(res, {
    statusCode: 200,
    success: true,
    message: 'Logout successfully !',
    data: 'Logout successfully !',
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Token Refreshed successfully !',
    data: result,
  });
});

// const changePassword = catchAsync(async (req: Request, res: Response) => {
//   const user = req.user;
//   const { ...passwordData } = req.body;

//   await AuthService.changePassword(user, passwordData);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Password changed successfully !',
//   });
// });

// const forgotPassword = catchAsync(async (req: Request, res: Response) => {

//   await AuthService.forgotPassword(req.body);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Check your email!",
//   });
// });

// const resetPassword = catchAsync(async (req: Request, res: Response) => {

//   const token = req.headers.authorization || "";
//   await AuthService.resetPassword(req.body, token);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Account recovered!",
//   });
// });

export const AuthController = {
  login,
  logout,
  refreshToken,
  // changePassword,
  // forgotPassword,
  // resetPassword
};