import prisma from '../../../shared/prisma';
import { Seller } from '@prisma/client';

// get all
// const getAll = async (
//   filters: IHelperFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<Helper[]>> => {
//   const { searchTerm, ...filterData } = filters;
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const andConditions = [];

//   if (searchTerm) {
//     andConditions.push({
//       OR: helperSearchableFields.map(field => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       AND: Object.entries(filterData).map(([field, value]) => ({
//         [field]: value === 'true' ? true : value === 'false' ? false : value,
//       })),
//     });
//   }

//   const whereConditions: Prisma.HelperWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.helper.findMany({
//     where: whereConditions,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     skip,
//     take: limit,
//   });

//   const total = await prisma.helper.count({
//     where: whereConditions,
//   });
//   const totalPage = Math.ceil(total / limit);

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//       totalPage,
//     },
//     data: result,
//   };
// };

// get single
const getSingle = async (id: string): Promise<Seller | null> => {
  const result = await prisma.seller.findUnique({
    where: {
      userId: id,
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

export const SellerService = {
  getSingle,
};