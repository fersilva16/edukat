import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';

import ValidationException from '~/exceptions/ValidationException';

import validate from './validate';

export default async function validateObject<T extends object>(
  Entity: ClassType<T>,
  object: object | object[],
): Promise<T> {
  if (Array.isArray(object)) {
    throw new ValidationException(Entity.name, [
      plainToClass(ValidationError, {
        value: object,
        constraints: {
          isObject: 'body should be an object',
        },
      }),
    ]);
  }

  return validate(Entity, object).catch((errors) => {
    throw new ValidationException(Entity.name, errors);
  });
}
