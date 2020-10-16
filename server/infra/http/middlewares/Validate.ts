import { ClassType } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

import ValidationException from '~/exceptions/ValidationException';
import type { IMiddleware } from '~/types';
import transform from '~/utils/transform';
import validate from '~/utils/validate';

export default class ValidateMiddleware implements IMiddleware {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    cls: ClassType<any>,
  ): Promise<void> {
    if (Array.isArray(request.body)) {
      throw new ValidationException([
        transform.toClass(ValidationError, {
          value: request.body,
          constraints: {
            isObject: 'body should be an object',
          },
        }),
      ]);
    }

    const data = await validate(cls, {
      ...request.body,
      ...request.params,
      ...request.query,
    });

    request.data = transform.toClass(cls, data);

    next();
  }
}
