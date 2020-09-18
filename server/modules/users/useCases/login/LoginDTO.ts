import { Property } from '~/utils/transformers';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from '~/utils/validators';

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
