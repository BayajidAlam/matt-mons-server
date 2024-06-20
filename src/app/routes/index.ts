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
    path: '/tags',
    route: ProductTagsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
