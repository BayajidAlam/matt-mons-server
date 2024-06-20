import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import auth from '../../middlewares/auth';
// import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';


const router = express.Router();

// get all category
router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.SELLER,
  //   ENUM_USER_ROLE.SELLS_MANAGER,
  //   ENUM_USER_ROLE.CUSTOMER
  // ),
  CategoryController.getAllCategory
);

// create shop
router.post(
  '/create-category',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(CategoryValidation.createCategory),
  CategoryController.createCategory
);



export const CategoryRoutes = router;
