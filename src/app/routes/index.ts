import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ShopRoutes } from '../modules/shop/shop.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ProductSkuRoutes } from '../modules/productSku/productSku.route';
import { ProductTagsRoutes } from '../modules/ProductTags/ProductTags.route';
import { ProductRoutes } from '../modules/product/product.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { SellerRoutes } from '../modules/seller/seller.route';
import { SellsManagerRoutes } from '../modules/sellsManager/sellsManager.route';
import { CouponRoutes } from '../modules/coupon/cupon.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ColorsRoutes } from '../modules/color/color.route';
import { SizeRoutes } from '../modules/size/size.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/sellers',
    route: SellerRoutes,
  },
  {
    path: '/sells-managers',
    route: SellsManagerRoutes,
  },
  {
    path: '/shops',
    route: ShopRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/skus',
    route: ProductSkuRoutes,
  },
  {
    path: '/colors',
    route: ColorsRoutes,
  },
  {
    path: '/sizes',
    route: SizeRoutes,
  },
  {
    path: '/tags',
    route: ProductTagsRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
