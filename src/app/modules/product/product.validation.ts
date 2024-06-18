import { z } from 'zod';

const createProductValidation = z.object({
  body: z.object({
    shopId: z.string({
      required_error: 'Shop ID is required',
    }),
    productName: z.string({
      required_error: 'Product name is required',
    }),
    productMainImage: z.string({
      required_error: 'Product main image is required',
    }),
    productAdditionalImages: z.array(z.string()),
    productDetails: z.string({
      required_error: 'Product details are required',
    }),
    productAdditionalInfo: z.string().optional(),
    minPrice: z.string({
      required_error: 'Minimum price is required',
    }),
    discountPrice: z.string().optional(),
    discountPercentage: z.string().optional(),
    moneySaved: z.string().optional(),
    isAvailable: z.boolean({
      required_error: 'Availability status is required',
    }),
    productSkuId: z.string({
      required_error: 'Product SKU ID is required',
    }),
    categoryId: z.string({
      required_error: 'Category ID is required',
    }),
    productTagsId: z.array(z.string()).nonempty().optional()
  }),
});

export const ProductValidation = {
  createProductValidation,
};