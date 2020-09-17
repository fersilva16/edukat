import { defaultMetadataStorage } from 'class-transformer/storage';
import {
  IsAlphanumeric as IsAlphanumericValidator,
  IsEmail as IsEmailValidator,
  IsJWT as IsJWTValidator,
  IsNotEmpty as IsNotEmptyValidator,
  IsOptional as IsOptionalValidator,
  IsString as IsStringValidator,
  Length as LengthValidator,
} from 'class-validator';

function createPropertyValidator<T extends (...args: any[]) => any>(Validator: T) {
  return (...args: Parameters<T>) => {
    const validator = Validator(...args);

    return (target: Object, propertyName: string) => {
      const metadata = defaultMetadataStorage.findExposeMetadata(target as Function, propertyName);

      validator(target, metadata.options.name || propertyName);
    };
  };
}

export const IsAlphanumeric = createPropertyValidator(IsAlphanumericValidator);
export const IsEmail = createPropertyValidator(IsEmailValidator);
export const IsJWT = createPropertyValidator(IsJWTValidator);
export const IsNotEmpty = createPropertyValidator(IsNotEmptyValidator);
export const IsOptional = createPropertyValidator(IsOptionalValidator);
export const IsString = createPropertyValidator(IsStringValidator);
export const Length = createPropertyValidator(LengthValidator);
