import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = express.Router();

// get all orders
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.DRIVER,
  //   ENUM_USER_ROLE.HELPER
  // ),
  OrderController.getAll
);

// create 
router.post(
  '/create-order',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(OrderValidation.createOrder),
  OrderController.createOrder
);

// get single
// router.get(
//   '/:id',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   // ),
//   CouponController.getSingle
// );

// // update single
// router.patch(
//   '/:id',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.DRIVER,
//     ENUM_USER_ROLE.HELPER
//   ),
//   validateRequest(HelperValidation.update),
//   HelperController.updateSingle
// );

// // inactive
// router.patch(
//   '/:id/inactive',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.DRIVER,
//     ENUM_USER_ROLE.HELPER
//   ),
//   HelperController.inactive
// );

export const OrderRoutes = router;
