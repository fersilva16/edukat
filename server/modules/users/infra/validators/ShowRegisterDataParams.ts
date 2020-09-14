import { IsNotEmpty, IsJWT } from 'class-validator';

export default class ShowRegisterDataParams {
  @IsJWT()
  @IsNotEmpty()
  token: string;
}
