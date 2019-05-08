import { IsInt, Min } from 'class-validator';

import { UserCreateDto } from './user-create.dto';

export class UserUpdateDto extends UserCreateDto {
  @IsInt()
  @Min(0)
  id: number;
}
