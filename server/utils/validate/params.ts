import { ClassType } from 'class-transformer-validator';

import ParamsValidationException from '~/exceptions/ParamsValidationException';

import validate from './validate';

export default async function validateParams<T extends object>(
  Entity: ClassType<T>,
  params: object,
): Promise<T> {
  return validate(Entity, params).catch((errors) => {
    throw new ParamsValidationException(errors);
  });
}
