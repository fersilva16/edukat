import {
  IsAlphanumeric as IsAlphanumericValidator,
  IsEmail as IsEmailValidator,
  IsJWT as IsJWTValidator,
  IsNotEmpty as IsNotEmptyValidator,
  IsOptional as IsOptionalValidator,
  IsString as IsStringValidator,
  Length as LengthValidator,
  MaxLength as MaxLengthValidator,
} from 'class-validator';

import createPropertyValidator from '~/utils/createPropertyValidator';

import IsEqualToValidator from './validators/IsEqualTo';
import IsNotEqualToValidator from './validators/IsNotEqualTo';

export { default as Cron } from './Cron';

export { default as Column } from './transformers/Column';
export { default as DateColumn } from './transformers/DateColumn';
export { default as Helper } from './transformers/Helper';
export { default as Property } from './transformers/Property';
export { default as SensitiveColumn } from './transformers/SensitiveColumn';
export { default as Virtual } from './transformers/Virtual';

export const IsAlphanumeric = createPropertyValidator(IsAlphanumericValidator);
export const IsEmail = createPropertyValidator(IsEmailValidator);
export const IsEqualTo = createPropertyValidator(IsEqualToValidator);
export const IsJWT = createPropertyValidator(IsJWTValidator);
export const IsNotEmpty = createPropertyValidator(IsNotEmptyValidator);
export const IsNotEqualTo = createPropertyValidator(IsNotEqualToValidator);
export const IsOptional = createPropertyValidator(IsOptionalValidator);
export const IsString = createPropertyValidator(IsStringValidator);
export const Length = createPropertyValidator(LengthValidator);
export const MaxLength = createPropertyValidator(MaxLengthValidator);
