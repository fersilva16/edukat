import {
  IsEmail,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export default class PartialUser {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
