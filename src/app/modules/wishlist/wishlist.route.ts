import express from 'express';
import validateRequest from '../../middlewares/validateRequest';import { WishlistController } from './wishlist.controller';
import { WishlistValidation } from './wishlist.validation';
;
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
  WishlistController.getAll
);

// create
router.post(
  '/add-to-cart',
  // auth(
  //   ENUM_Shop_ROLE.SUPER_ADMIN,
  //   ENUM_Shop_ROLE.ADMIN,
  // ),
  validateRequest(WishlistValidation.createWishlist),
  WishlistController.createWishlist
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
  WishlistController.deleteSingle
);


export const WishlistRoutes = router;
