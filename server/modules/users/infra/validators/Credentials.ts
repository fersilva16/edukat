import {
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export default class Credentials {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
