import {
  IsJWT,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import IsEqualTo from '~/utils/IsEqualTo';

export default class RegisterData {
  @IsJWT()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEqualTo('password')
  password_confirmation: string;
}
