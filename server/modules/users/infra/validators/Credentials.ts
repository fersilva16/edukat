import {
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';

export default class Credentials {
  @ValidateIf(({ username }: Credentials) => !username)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf(({ email }: Credentials) => !email)
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
