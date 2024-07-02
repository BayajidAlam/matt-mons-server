import { Prisma } from "@prisma/client";

export type IProductSkuFilters = {
  searchTerm?: string;
};

export type ExtendedProductSkuWhereInput = {
  shopId?: string; 
} & Prisma.ProductSkuWhereInput