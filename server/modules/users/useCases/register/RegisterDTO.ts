import {
  Property,
  IsJWT,
  IsNotEmpty,
  IsString,
  IsEqualTo,
} from '~/decorators';

export default class RegisterDTO {
  @IsString()
  @IsJWT()
  @IsNotEmpty()
  @Property('token')
  token!: string;

  @IsString()
  @IsNotEmpty()
  @Property('firstname')
  firstname!: string;

  @IsString()
  @IsNotEmpty()
  @Property('lastname')
  lastname!: string;

  @IsString()
  @IsNotEmpty()
  @Property('password')
  password!: string;

  @IsString()
  @IsNotEmpty()
  @IsEqualTo('password')
  @Property('password_confirmation')
  passwordConfirmation!: string;
}
