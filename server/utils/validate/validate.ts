import { ClassType, transformAndValidate } from 'class-transformer-validator';

async function validate<T extends object>(Entity: ClassType<T>, array: object[]): Promise<T[]>;
async function validate<T extends object>(Entity: ClassType<T>, object: object): Promise<T>;
async function validate<T extends object>(
  Entity: ClassType<T>,
  object: object | object[],
): Promise<T | T[]> {
  return transformAndValidate(Entity, object, {
    validator: {
      validationError: {
        target: false,
      },
    },
  });
}

export default validate;
