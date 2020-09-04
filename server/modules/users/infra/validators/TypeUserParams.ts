import { IsUUID, IsNotEmpty } from 'class-validator';

export default class TypeUserParams {
  @IsUUID('4')
  @IsNotEmpty()
  type_id: string;
}
