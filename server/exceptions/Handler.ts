import { Request, Response, NextFunction } from 'express';

import appConfig from '~/config/app';
import logger from '~/logger';

import Exception from './Exception';

export default class Handler {
  handle(
    exception: Exception | Error,
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    if (exception instanceof Exception) {
      exception.handle(request, response, next);

      return;
    }

    if (appConfig.env === 'production') {
      logger.error(exception.message, {
        label: 'server',
        stack: exception.stack,
      });
    } else {
      logger.error(exception.stack, { label: 'server' });
    }

    response.status(500).send({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });

    next();
  }
}
