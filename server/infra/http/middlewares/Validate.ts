import { ClassType, transformAndValidate } from 'class-transformer-validator';
import { Request, Response, NextFunction } from 'express';

import IMiddleware from '~/types/IMiddleware';

export default class ValidateMiddleware implements IMiddleware {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    cls: ClassType<any>,
  ): Promise<void> {
    request.data = await transformAndValidate(
      cls,
      {
        ...request.body,
        ...request.params,
        ...request.query,
      },
    );

    next();
  }
}
