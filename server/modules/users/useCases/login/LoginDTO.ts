import {
  Property,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from '~/decorators';

export default class LoginDTO {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  @Property('email')
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Property('password')
  password!: string;

  @IsBoolean()
  @IsOptional()
  @Property('remember_me')
  rememberMe?: boolean;
}
