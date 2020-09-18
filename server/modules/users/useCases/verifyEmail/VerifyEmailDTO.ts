import { Property } from '~/utils/transformers';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from '~/utils/validators';

export default class VerifyEmailDTO {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  @Property('email')
  email!: string;
}
