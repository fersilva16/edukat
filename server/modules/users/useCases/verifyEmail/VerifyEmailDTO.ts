import {
  Property,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from '~/decorators';

export default class VerifyEmailDTO {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  @Property('email')
  email!: string;
}
