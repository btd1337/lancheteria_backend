import {
	Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put
} from '@nestjs/common';

import { RestaurantUpdateDto } from './restaurant-update.dto';
import { Restaurant } from './restaurant.entity';
import { RestaurantCreateDto } from './restaurants-create.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.restaurantsService.findOne(+id).then(data => {
      if (!data) {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      }
    });
  }

  @Post()
  async create(@Body() restaurant: RestaurantCreateDto) {
    return this.restaurantsService.create(restaurant);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() restaurant: RestaurantUpdateDto,
  ) {
    return this.restaurantsService.update(+id, restaurant).then(data => {
      if (!data) {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      }
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    return this.restaurantsService.delete(+id).then(data => {
      if (!data.affected) {
        throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      }
    });
  }
}
