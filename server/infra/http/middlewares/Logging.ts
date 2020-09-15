import { Request, Response, NextFunction } from 'express';

import logger from '~/logger';
import IMiddleware from '~/types/IMiddleware';

export default class LoggingMiddleware implements IMiddleware {
  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.http(`${request.ip} - "${request.method} ${request.url}" "${request.headers['user-agent']}"`, { label: 'server' });

    next();
  }
}
