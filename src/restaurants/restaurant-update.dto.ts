import { IsInt, IsPositive } from 'class-validator';

import { RestaurantCreateDto } from './restaurants-create.dto';

export class RestaurantUpdateDto extends RestaurantCreateDto {
  @IsInt()
  @IsPositive()
  id: number;
}
