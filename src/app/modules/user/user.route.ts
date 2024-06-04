import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// get all
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  UserController.getAll
);

// create super admin
router.post(
  '/create-super-admin',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  validateRequest(UserValidation.createSuperAdmin),
  UserController.createSuperAdmin
);

// create admin
router.post(
  '/create-admin',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
  ),
  validateRequest(UserValidation.createAdmin),
  UserController.createAdmin
);


export const UserRoutes = router;
