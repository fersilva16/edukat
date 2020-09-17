import { defaultMetadataStorage } from 'class-transformer/storage';
import {
  IsAlphanumeric,
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
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

export = {
  IsAlphanumeric: createPropertyValidator(IsAlphanumeric),
  IsEmail: createPropertyValidator(IsEmail),
  IsJWT: createPropertyValidator(IsJWT),
  IsNotEmpty: createPropertyValidator(IsNotEmpty),
  IsOptional: createPropertyValidator(IsOptional),
  IsString: createPropertyValidator(IsString),
  Length: createPropertyValidator(Length),
};
