import {
  Helper,
  Property,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from '~/decorators';

import Type from '@users/entities/Type';

export default class CreateUserDTO {
  @IsString()
  @IsOptional()
  @Property('firstname')
  firstname?: string;

  @IsString()
  @IsOptional()
  @Property('lastname')
  lastname?: string;

  @IsString()
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  @Property('email')
  email!: string;

  @IsString()
  @IsAlphanumeric()
  @Length(6, 6)
  @IsNotEmpty()
  @Property('type_id')
  typeId!: string;

  @Helper()
  userType!: Type;
}
