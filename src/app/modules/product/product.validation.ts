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
    productAdditionalInfo: z.any(),
    minPrice: z.string({
      required_error: 'Minimum price is required',
    }),
    discountPrice: z.string().optional(),
    productSkuId: z.string({
      required_error: 'Product SKU ID is required',
    }),
    categoryId: z.string({
      required_error: 'Category ID is required',
    }),
    productTagsId: z.array(z.string()).nonempty().optional(),
  }),
});

const updateProductValidation = z.object({
  body: z.object({
    shopId: z.string().optional(),
    productName: z.string().optional(),
    productMainImage: z.string().optional(),
    productAdditionalImages: z.array(z.string()).optional(),
    productDetails: z.string().optional(),
    productAdditionalInfo: z.any().optional(),
    minPrice: z.string().optional(),
    discountPrice: z.string().optional(),
    productSkuId: z.string().optional(),
    categoryId: z.string().optional(),
    productTagsId: z.array(z.string()).nonempty().optional(),
  }).partial(), // Makes all properties of the object optional
});

export const ProductValidation = {
  createProductValidation,
  updateProductValidation
};
