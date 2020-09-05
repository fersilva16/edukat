import { IsEmail, IsNotEmpty } from 'class-validator';

export default class Email {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
