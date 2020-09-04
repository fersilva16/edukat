import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';

import ValidationException from '~/exceptions/ValidationException';

import validate from './validate';

export default async function validateArray<T extends object>(
  Entity: ClassType<T>,
  array: object | object[],
): Promise<T[]> {
  if (!Array.isArray(array)) {
    throw new ValidationException(Entity.name, [
      plainToClass(ValidationError, {
        value: array,
        constraints: {
          isArray: 'body should be an array',
        },
      }),
    ]);
  }

  return validate(Entity, array).catch((errors) => {
    throw new ValidationException(Entity.name, errors);
  });
}
