import {
  Helper,
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
  Property,
} from '~/decorators';

import Type from '@users/entities/Type';
import User from '@users/entities/User';

export default class CreateInviteDTO {
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Property('max_uses')
  maxUses?: number;

  @IsString()
  @IsAlphanumeric()
  @Length(6, 6)
  @IsNotEmpty()
  @Property('type_id')
  typeId!: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @Min(1800)
  @IsOptional()
  @Property('expires_in')
  expiresIn?: number;

  @Helper()
  user!: User;

  @Helper()
  userType!: Type;
}
