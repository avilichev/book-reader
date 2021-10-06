import { renderRoutes } from 'react-router-config';
import { routes } from './routes';

export function Pages() {
  return renderRoutes(routes);
}
