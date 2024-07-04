import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CartController } from './cart.controller';
import { CartValidation } from './cart.validation';
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
  CartController.getAll
);

// create
router.post(
  '/add-to-cart',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(CartValidation.createCart),
  CartController.createCart
);

// get single
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  CartController.getSingle
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
  validateRequest(CartValidation.updateCart),
  CartController.updateSingle
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
  CartController.deleteSingle
);

export const CartRoutes = router;
