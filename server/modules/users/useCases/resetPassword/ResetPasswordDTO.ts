import {
  IsNotEmpty,
  IsEqualTo,
  IsJWT,
  IsString,
  Property,
  IsNotEqualTo,
} from '~/decorators';

export default class ResetPasswordDTO {
  @IsString()
  @IsJWT()
  @IsNotEmpty()
  @Property('token')
  token!: string;

  @IsString()
  @IsNotEmpty()
  @Property('old_password')
  oldPassword!: string;

  @IsString()
  @IsNotEqualTo('old_password')
  @IsNotEmpty()
  @Property('new_password')
  newPassword!: string;

  @IsString()
  @IsEqualTo('new_password')
  @IsNotEmpty()
  @Property('new_password_confirmation')
  newPasswordConfirmation!: string;
}
