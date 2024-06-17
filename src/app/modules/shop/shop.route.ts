import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ShopController } from './shop.controller';
import { ShopValidation } from './shop.validation';

const router = express.Router();

// create shop
router.post(
  '/create-shop',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(ShopValidation.createShop),
  ShopController.createShop
);

export const ShopRoutes = router;
