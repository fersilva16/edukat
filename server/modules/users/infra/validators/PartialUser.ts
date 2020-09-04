import {
  IsEmail,
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export default class PartialUser {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @MaxLength(15)
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
