import next from 'next';
import { RequestHandler } from 'express';

import { env } from '../config';

const ssr = next({
  dev: env !== 'production',
  conf: {
    useFileSystemPublicRoutes: false,
  },
});

export function render(page: string): RequestHandler {
  return (request, response) => ssr.render(request, response, `/${page}`);
}

export const handle = ssr.getRequestHandler();

export default ssr;
