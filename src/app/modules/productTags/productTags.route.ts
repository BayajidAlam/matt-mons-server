import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductTagsController } from './ProductTags.controller';
import { ProductTagsValidation } from './ProductTags.validation';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// create shop
router.post(
  '/create-product-tags',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(ProductTagsValidation.createProductTagsValidation),
  ProductTagsController.createProductTags
);

export const ProductTagsRoutes = router;
