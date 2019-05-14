import { IsNotEmpty, IsOptional, Length } from 'class-validator';

import { MenuItem } from './menu/menu-item/menu-item.entity';

export class RestaurantCreateDto {
  @IsNotEmpty()
  @Length(4, 255)
  name: string;

  @IsOptional()
  menu: MenuItem[];
}
