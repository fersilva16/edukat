import { ClassType } from 'class-transformer/ClassTransformer';
import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { validate } from '~/infra/http/middlewares';
import IController from '~/types/IController';

export default function createRequestHandler(
  useCase: string,
  ...middlewares: RequestHandler[]
): RequestHandler[] {
  const controller = container.resolve<IController>(`${useCase}Controller`);

  try {
    const DTO = container.resolve<ClassType<any>>(`${useCase}DTO`);

    middlewares.unshift(validate(DTO));
  } catch {
    // DTO not exists
  }

  return [
    ...middlewares,
    (request, response, next) => controller.handle(request, response, next).catch(next),
  ];
}
