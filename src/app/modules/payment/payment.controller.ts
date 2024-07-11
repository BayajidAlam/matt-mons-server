import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';
import { Request, Response } from 'express';

// get all
// const getAll = catchAsync(async (req: Request, res: Response) => {
//   const { shopId, ...colorData } = req.query;
//   const filters = pick(colorData, ColorFilterableFields);
//   const paginationOptions = pick(req.query, paginationFields);

//   const result = await ProductColorService.getAll(
//     shopId as string,
//     filters,
//     paginationOptions
//   );

//   sendResponse<Color[]>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Color retrieved successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });

//create
const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;
  const result = await PaymentService.createPaymentIntent(paymentData);
 
  sendResponse<any>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'payment intent created Successfully',
    data: result,
  });
});

//create
// const createColor = catchAsync(async (req: Request, res: Response) => {
//   const ProductColorData = req.body;
//   const result = await ProductColorService.createColor(ProductColorData);

//   sendResponse<Color>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Color created Successfully',
//     data: result,
//   });
// });

// get single
// const getSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await ProductColorService.getSingle(id);

//   sendResponse<Color>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Color retrieved successfully',
//     data: result,
//   });
// });

// update single
// const updateSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;

//   const result = await ProductColorService.updateSingle(id, data);

//   sendResponse<Color>(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Color Updated Successfully',
//     data: result,
//   });
// });

// delete
// const deleteSingle = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;

//   const result = await ProductColorService.deleteSingle(id);

//   sendResponse<Color>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Color Deleted successfully',
//     data: result,
//   });
// });

export const PaymentController = {
  // getAll,
  createPaymentIntent,
  // createColor,
  // getSingle,
  // updateSingle,
  // deleteSingle,
};
