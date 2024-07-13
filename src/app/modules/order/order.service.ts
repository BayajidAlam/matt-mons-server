import prisma from '../../../shared/prisma';
import { Order, OrderStatus, Prisma } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  IOrderFilters,
  IOrderPayload,
  IOrderResponse,
} from './order.interface';
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
    select: {
      id: true,
      total: true,
      subTotal: true,
      shippingCharge: true,
      tax: true,
      orderPlacedAt: true,
      being_delivered: true,
      curier_wareshouse: true,
      delivered_to_curier: true,
      payment_acceptedAt: true,
      orderStatus: true,
      canceledAt: true,
      delivered: true,
      OrderItems: {
        include: {
          Product: {
            select: {
              minPrice: true,
              productMainImage: true,
              productName: true,
            },
          },
        },
      },
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

// get all orders of a shop
const getAllSellsOrder = async (
  shopId: string,
  orderStatus: OrderStatus,
  filters: IOrderFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.OrderWhereInput[] = [{ shopId }];

  if (Object.values(OrderStatus).includes(orderStatus as OrderStatus)) {
    andConditions.push({
      orderStatus: orderStatus as OrderStatus,
    });
  } else {
    andConditions.push({
      orderStatus: {
        notIn: [
          OrderStatus.cancel,
          OrderStatus.delivered,
          OrderStatus.returned,
        ],
      },
    });
  }

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
    select: {
      id: true,
      orderStatus: true,
      fullName: true,
      contactNumber: true,
      address: true,
      orderPlacedAt: true,
      canceledAt: true,
      total: true,
      OrderItems: {
        include: {
          Product: {
            select: {
              minPrice: true,
              productMainImage: true,
              productName: true,
            },
          },
        },
      },
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
const createOrder = async (
  orderData: IOrderPayload
): Promise<IOrderResponse | null> => {
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
  const subTotal: number = orderedProducts?.reduce(
    (total: number, item: any) =>
      total + Number(item.Product.discountPrice) * item.quantity,
    0
  );

  const shipping = 90;
  const taxAmount = 0;
  const total = subTotal + shipping + taxAmount;
  const trnsId = orderData.trnsId;

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
    paidAmount: parseFloat(String(total)),
    dueAmount: 0,
    isPaid: false,
    shopId: orderData.shopId,
    couponId: orderData.couponId,
  };

  // Use transaction to ensure that all database operations are completed successfully as a single unit
  const result = await prisma.$transaction(async prisma => {
    const orderResult = await prisma.order.create({
      data: dataForOrder,
    });

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

    await Promise.all(
      orderedProducts.map(async item => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        await prisma.product.update({
          where: { id: item.productId },
          data: { sellCount: product.sellCount + item.quantity },
        });
      })
    );

    const paymentInfo = await prisma.payment.create({
      data: {
        trnxId: trnsId,
        userId: orderData.userId,
        orderId: orderResult.id,
      },
    });

    const updateOrder = await prisma.order.update({
      where: {
        id: orderResult.id,
      },
      data: {
        isPaid: true,
        payment_acceptedAt: new Date(),
      },
    });

    await prisma.cart.deleteMany({
      where: {
        userId: orderData.userId,
      },
    });

    return { orderResult, orderItems, paymentInfo, updateOrder };
  });

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

// update single
const updateSingle = async (
  id: string,
  payload: Partial<Order>
): Promise<Order | null> => {
  // check is exist
  const isExist = await prisma.order.findUnique({
    where: {
      id,
    },
    select: {
      orderStatus: true,
      delivered: true,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Found');
  }

  if (isExist.orderStatus === OrderStatus.delivered) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Can not cancel order, product delivered'
    );
  }

  const result = await prisma.order.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Order');
  }
  return result;
};

export const OrderService = {
  getSingle,
  getAll,
  getAllSellsOrder,
  createOrder,
  updateSingle,
};
