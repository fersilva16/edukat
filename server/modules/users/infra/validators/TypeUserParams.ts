import { IsAlphanumeric, IsNotEmpty, MaxLength } from 'class-validator';

export default class TypeUserParams {
  @IsAlphanumeric()
  @MaxLength(6)
  @IsNotEmpty()
  type_id!: string;
}
