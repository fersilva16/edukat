import { Request, Response, NextFunction } from 'express';

import logger from '~/logger';
import createMiddleware from '~/utils/createMiddleware';

async function logging(request: Request, response: Response, next: NextFunction): Promise<void> {
  logger.http(`${request.ip} - "${request.method} ${request.url}" "${request.headers['user-agent']}"`, { label: 'server' });

  next();
}

export default createMiddleware(logging);
