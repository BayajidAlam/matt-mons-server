import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductSkuController } from './productSku.controller';
import { ProductSkuValidation } from './productSku.validation';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// get all
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.DRIVER,
  //   ENUM_USER_ROLE.HELPER
  // ),
  ProductSkuController.getAll
);

// create shop
router.post(
  '/create-product-sku',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(ProductSkuValidation.createProductSku),
  ProductSkuController.createProductSku
);

// get single
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  ProductSkuController.getSingle
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
  validateRequest(ProductSkuValidation.updateProductSku),
  ProductSkuController.updateSingle
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
  ProductSkuController.deleteSingle
);

export const ProductSkuRoutes = router;
