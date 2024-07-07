import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerController } from './customer.controller';
import { CustomerValidation } from './customer.validation';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// get all
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

// get single
router.get(
  '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  // ),
  CustomerController.getSingle
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
  validateRequest(CustomerValidation.updateCustomer),
  CustomerController.updateSingle
);

// delete single
// router.delete(
//   '/:id',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.DRIVER,
  //   ENUM_USER_ROLE.HELPER
  // ),
//   ColorsController.deleteSingle
// );

export const CustomersRoutes = router;
