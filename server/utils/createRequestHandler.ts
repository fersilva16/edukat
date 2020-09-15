import { RequestHandler } from 'express';

import IController from '~/types/IController';

import createMiddleware from './createMiddleware';

export default function createRequestHandler(
  controller: IController,
  ...middlewares: RequestHandler[]
): RequestHandler[] {
  if (controller.validate) {
    middlewares.unshift(
      createMiddleware({
        async handle(request, response, next) {
          await controller.validate(request);

          next();
        },
      }),
    );
  }

  return [
    ...middlewares,
    (request, response, next) => controller.handle(request, response, next).catch(next),
  ];
}
