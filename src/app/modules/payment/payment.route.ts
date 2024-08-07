import express from 'express';
import { PaymentController } from './payment.controller';
const router = express.Router();

// // get all
// router.get(
//   '/',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   //   ENUM_USER_ROLE.DRIVER,
//   //   ENUM_USER_ROLE.HELPER
//   // ),
//   ColorsController.getAll
// );

// create 
router.post(
  '/create-payment-intent',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  PaymentController.createPaymentIntent
);

// // create 
// router.post(
//   '/create-color',
//   // auth(
//   //   ENUM_Shop_ROLE.SUPER_ADMIN,
//   //   ENUM_Shop_ROLE.ADMIN,
//   // ),
//   validateRequest(ColorsValidation.createColor),
//   ColorsController.createColor
// );

// // get single
// router.get(
//   '/:id',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   // ),
//   ColorsController.getSingle
// );

// // update single
// router.patch(
//   '/:id',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   //   ENUM_USER_ROLE.DRIVER,
//   //   ENUM_USER_ROLE.HELPER
//   // ),
//   validateRequest(ColorsValidation.updateColor),
//   ColorsController.updateSingle
// );

// // delete single
// router.delete(
//   '/:id',
//   // auth(
//   //   ENUM_USER_ROLE.SUPER_ADMIN,
//   //   ENUM_USER_ROLE.ADMIN,
//   //   ENUM_USER_ROLE.DRIVER,
//   //   ENUM_USER_ROLE.HELPER
//   // ),
//   ColorsController.deleteSingle
// );

export const PaymentRoutes = router;
