import {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

import createMiddleware from './createMiddleware';

export type Controller = {
  validate(request: Request): Promise<void>;

  handle(request: Request, response: Response): Promise<void>;
  handle(request: Request, response: Response, next: NextFunction): Promise<void>;
};

export default function createRequestHandler(
  controller: Controller,
  ...middlewares: RequestHandler[]
): RequestHandler[] {
  const validationMiddleware = createMiddleware(
    async (request, response, next) => {
      await controller.validate(request);

      next();
    },
  );

  return [
    validationMiddleware,
    ...middlewares,
    (request, response, next) => controller.handle(request, response, next).catch(next),
  ];
}
