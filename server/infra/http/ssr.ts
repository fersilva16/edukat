import { RequestHandler } from 'express';
import next from 'next';

import appConfig from '~/config/app';

const ssr = next({
  dev: appConfig.env !== 'production',
  conf: {
    useFileSystemPublicRoutes: false,
  },
});

export function render(page: string): RequestHandler {
  return (request, response) => ssr.render(request, response, `/${page}`);
}

export const handle = ssr.getRequestHandler();

export async function prepareSSR() {
  return ssr.prepare();
}

export default ssr;
