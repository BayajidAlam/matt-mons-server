import { Customer } from '@prisma/client';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CustomerService } from './customer.service';


// get all
// const getAll = catchAsync(async (req: Request, res: Response) => {
  
//   const { shopId, ...colorData } = req.query;
//   const filters = pick(colorData, CustomerFilterableFields);
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


// get single
const getSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CustomerService.getSingle(id);

  sendResponse<Customer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer retrieved successfully',
    data: result,
  });
});

// update single
const updateSingle = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await CustomerService.updateSingle(id, data);

  sendResponse<Customer>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Customer Updated Successfully',
    data: result,
  });
});

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

export const CustomerController = {
  getSingle,
  updateSingle,
};
