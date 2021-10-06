import { RouteConfig } from 'react-router-config';
import HomePage from './home';
import { paths } from './paths';

export const routes: RouteConfig[] = [
  {
    exact: true,
    path: paths.home(),
    component: HomePage,
  },
];
