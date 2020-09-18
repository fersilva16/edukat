import { ClassType, transformAndValidate } from 'class-transformer-validator';

import ValidationException from '~/exceptions/ValidationException';

async function validate<T extends object>(Entity: ClassType<T>, array: object[]): Promise<T[]>;
async function validate<T extends object>(Entity: ClassType<T>, object: object): Promise<T>;
async function validate<T extends object>(
  Entity: ClassType<T>,
  object: object | object[],
): Promise<T | T[]> {
  return transformAndValidate(Entity, object, {
    transformer: {
      excludeExtraneousValues: true,
      ignoreDecorators: true,
    },
    validator: {
      validationError: {
        target: false,
      },
    },
  }).catch((errors) => {
    throw new ValidationException(errors);
  });
}

export default validate;
