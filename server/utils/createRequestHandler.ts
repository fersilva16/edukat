import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import IController from '~/types/IController';

import createMiddleware from './createMiddleware';

export default function createRequestHandler(
  useCase: string,
  ...middlewares: RequestHandler[]
): RequestHandler[] {
  const controller = container.resolve<IController>(`${useCase}Controller`);

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
