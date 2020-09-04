import { Request, Response, NextFunction } from 'express';

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

    logger.error(exception.message, { label: 'server' });

    response.status(500).send({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });

    next();
  }
}
