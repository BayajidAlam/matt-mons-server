import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductController } from './product.controller';
import { ProductValidation } from './product.validation';

const router = express.Router();

// get all product of a shop
router.get(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  ProductController.getAll
);

// get all product of a seller
router.get(
  '/daily-best-sell',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  ProductController.getAllDailyBestSell
);


// get all product of a seller
router.get(
  '/product-feed',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SELLER),
  ProductController.getAllFeedProduct
);

// create shop
router.post(
  '/create-product',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(ProductValidation.createProductValidation),
  ProductController.createProduct
);

// get single
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  ProductController.getSingle
);

// update single
router.patch(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.DRIVER,
  //   ENUM_USER_ROLE.HELPER
  // ),
  validateRequest(ProductValidation.updateProductValidation),
  ProductController.updateSingle
);

// delete single
router.delete(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.DRIVER,
  //   ENUM_USER_ROLE.HELPER
  // ),
  ProductController.deleteSingle
);

export const ProductRoutes = router;
