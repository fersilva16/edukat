import {
  Property,
  IsJWT,
  IsNotEmpty,
  IsString,
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
}
