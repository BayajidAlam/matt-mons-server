import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ColorsController } from './color.controller';
import { ColorsValidation } from './color.validation';
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
  ColorsController.getAll
);
// create shop
router.post(
  '/create-color',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(ColorsValidation.createColor),
  ColorsController.createColor
);

export const ColorsRoutes = router;
