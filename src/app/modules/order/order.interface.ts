export type IOrderFilters = {
  searchTerm?: string;
  orderStatus?: string;
};

export type IOrderResponse = {
  transId: string;
  orderId: string;
};

export type IProductType = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Product: any;
};

export type IOrderPayload = {
  products: IProductType[];
  userId: string;
  shopId: string;
  fullName: string;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  address: string;
  trnsId: string;
  couponId?: string;
};
