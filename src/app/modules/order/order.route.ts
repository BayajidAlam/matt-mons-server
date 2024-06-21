import express from 'express';
import { OrderController } from './order.controller';


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
  OrderController.getAll
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