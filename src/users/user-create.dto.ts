import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
  MaxLength,
  Validate
} from 'class-validator';
import { Gender } from 'src/utils/gender.enum';

import { IsCPF } from '../utils/cpf.validator';

export class UserCreateDto {
  @IsNotEmpty()
  @Length(4, 255)
  name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(128)
  email: string;

  @IsNotEmpty()
  @Length(4, 64)
  password: string;

  @Validate(IsCPF)
  cpf: string;
}
