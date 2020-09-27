import {
  Property,
  IsJWT,
  IsNotEmpty,
  IsString,
} from '~/decorators';

export default class ShowRegisterDataDTO {
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  @Property('token')
  token!: string;
}
