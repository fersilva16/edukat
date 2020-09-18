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

import createPropertyValidator from '~/utils/validators/createPropertyValidator';

import IsEqualToValidator from './IsEqualTo';

export const IsAlphanumeric = createPropertyValidator(IsAlphanumericValidator);
export const IsEmail = createPropertyValidator(IsEmailValidator);
export const IsEqualTo = createPropertyValidator(IsEqualToValidator);
export const IsJWT = createPropertyValidator(IsJWTValidator);
export const IsNotEmpty = createPropertyValidator(IsNotEmptyValidator);
export const IsOptional = createPropertyValidator(IsOptionalValidator);
export const IsString = createPropertyValidator(IsStringValidator);
export const Length = createPropertyValidator(LengthValidator);
export const MaxLength = createPropertyValidator(MaxLengthValidator);
