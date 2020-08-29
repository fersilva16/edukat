import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassType, transformAndValidate } from 'class-transformer-validator';

import ValidationException from '~/exceptions/ValidationException';

async function validate<T extends object>(
  Entity: ClassType<T>,
  object: object,
): Promise<T>;
async function validate<T extends object>(
  Entity: ClassType<T>,
  object: object[],
): Promise<T[]>;
async function validate<T extends object>(
  Entity: ClassType<T>,
  object: object | object[],
): Promise<T | T[]> {
  return transformAndValidate(Entity, object).catch((errors) => {
    throw new ValidationException(Entity.name, errors);
  });
}

export async function validateObject<T extends object>(
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

  return validate(Entity, object);
}

export async function validateArray<T extends object>(
  Entity: ClassType<T>,
  objects: object | object[],
): Promise<T[]> {
  if (!Array.isArray(objects)) {
    throw new ValidationException(Entity.name, [
      plainToClass(ValidationError, {
        value: objects,
        constraints: {
          isArray: 'body should be an array',
        },
      }),
    ]);
  }

  return validate(Entity, objects) as Promise<T[]>;
}
