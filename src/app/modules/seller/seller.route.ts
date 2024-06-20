import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { SellerController } from './seller.controller';


const router = express.Router();

// // get all
// router.get(
//   '/',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.DRIVER,
//     ENUM_USER_ROLE.HELPER
//   ),
//   HelperController.getAll
// );

// get single
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  SellerController.getSingle
);

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

export const SellerRoutes = router;