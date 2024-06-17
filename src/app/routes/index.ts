import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ShopRoutes } from '../modules/shop/shop.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/shops',
    route: ShopRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
