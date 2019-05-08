import { IsEmail, IsEnum, IsNotEmpty, Length, MaxLength } from 'class-validator';
import { Gender } from 'src/utils/gender.enum';

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
}
