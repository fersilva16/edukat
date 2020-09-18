import { Property } from '~/utils/transformers';
import {
  IsJWT,
  IsNotEmpty,
  IsString,
} from '~/utils/validators';

export default class ShowRegisterDataDTO {
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  @Property('token')
  token!: string;
}
