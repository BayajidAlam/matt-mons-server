import prisma from '../../../shared/prisma';
import { Order, OrderStatus, Prisma } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IOrderFilters } from './order.interface';
import { orderSearchableFields } from './order.constant';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// get all
const getAll = async (
  userId: string,
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.OrderWhereInput[] = [{ userId }];

  if (searchTerm) {
    andConditions.push({
      OR: orderSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value === 'true' ? true : value === 'false' ? false : value,
      })),
    });
  }

  const whereConditions: Prisma.OrderWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.order.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  const total = await prisma.order.count({
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

//create
const createOrder = async (orderData: Order) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: orderData.userId,
    },
  });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Calculation
  const orderedProducts = orderData.products;
  const subTotal = orderedProducts?.reduce(
    (total, item) => total + Number(item.Product.discountPrice) * item.quantity,
    0
  );

  const shipping = 90;
  const taxAmount = 0;
  const total = subTotal + shipping + taxAmount;
  const trnsId = orderData.trnsId;

  // Create the order without product details
  const dataForOrder = {
    userId: orderData.userId,
    fullName: orderData.fullName,
    contactNumber: orderData.contactNumber,
    emergencyContactNumber: orderData.emergencyContactNumber,
    email: orderData.email,
    address: orderData.address,
    subTotal: String(subTotal),
    shippingCharge: String(shipping),
    tax: String(taxAmount),
    total: String(total),
    orderStatus: OrderStatus.placed,
    trnsId,
    paidAmount: parseFloat(total),
    dueAmount: 0,
    isPaid: false,
    shopId: orderData.shopId,
    couponId: orderData.couponId,
  };

  // Use a transaction
  const result = await prisma.$transaction(async prisma => {
    const orderResult = await prisma.order.create({
      data: dataForOrder,
    });

    console.log(orderResult, 'order-result');

    const orderItems = await Promise.all(
      orderedProducts.map(item =>
        prisma.orderItem.create({
          data: {
            orderId: orderResult.id,
            productId: item.productId,
            quantity: item.quantity,
          },
        })
      )
    );

    console.log(orderItems, 'order-items');

    const paymentInfo = await prisma.payment.create({
      data: {
        trnxId: trnsId,
        userId: orderData.userId,
        orderId: orderResult.id,
      },
    });

    console.log(paymentInfo, 'payment-info');

    const updateOrder = await prisma.order.update({
      where: {
        id: orderResult.id,
      },
      data: {
        isPaid: true,
        payment_acceptedAt: new Date(),
      },
    });

    console.log(updateOrder, 'order-updated');

    return { orderResult, orderItems, paymentInfo, updateOrder };
  });

  // Log the transaction result
  console.log(result, 'transaction-result');
  if (result && result.orderResult && result.paymentInfo) {
    return {
      transId: result.paymentInfo.trnxId,
      orderId: result.orderResult.id,
    };
  } else {
    throw new Error('Transaction failed');
  }
};
// get single
const getSingle = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// // update single
// const updateSingle = async (
//   id: string,
//   payload: Partial<Helper>
// ): Promise<Helper | null> => {
//   // check is exist
//   const isExist = await prisma.helper.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Helper Not Found');
//   }

//   const result = await prisma.helper.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });

//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Helper');
//   }

//   return result;
// };

// // inactive
// const inactive = async (id: string): Promise<Helper | null> => {
//   // check is exist
//   const isExist = await prisma.helper.findUnique({
//     where: {
//       id,
//     },
//   });

//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Helper Not Found');
//   }

//   const result = await prisma.helper.update({
//     where: {
//       id,
//     },
//     data: { isActive: false },
//   });

//   return result;
// };

export const OrderService = {
  getSingle,
  getAll,
  createOrder,
};
