import {
  Property,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
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
}
