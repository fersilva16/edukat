import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Property,
} from '~/decorators';

export default class ForgotPasswordDTO {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  @Property('email')
  email!: string;
}
