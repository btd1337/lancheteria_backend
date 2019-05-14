import { IsInt, IsNotEmpty, IsNumber, IsPositive, Length, Min } from 'class-validator';

export class MenuItemDto {
  @IsNotEmpty()
  @Length(4, 255)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  restaurantId: number;
}
