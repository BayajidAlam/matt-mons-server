import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductSkuController } from './productSku.controller';
import { ProductSkuValidation } from './productSku.validation';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

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

export const ProductSkuRoutes = router;
