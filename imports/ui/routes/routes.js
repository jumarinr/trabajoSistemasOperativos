import _ from 'lodash';
import { lazy } from 'react';

const Dashboard = lazy(() => import('../screens/Inicio/Dashboard'));

export const ROUTES = [
  {
    path: '/',
    component: Dashboard,
  },
];

export const getPublicRoutes = () => ROUTES.filter((route) => route.isPublic);

export const getPrivateRoutes = () => ROUTES.filter((route) => !route.isPublic);

export const getCommonRoutes = () => ROUTES.filter((route) => _.isNil(route.isPublic));
