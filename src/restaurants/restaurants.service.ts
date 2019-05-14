import { DeleteResult, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RestaurantUpdateDto } from './restaurant-update.dto';
import { Restaurant } from './restaurant.entity';
import { RestaurantCreateDto } from './restaurants-create.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(restaurant: RestaurantCreateDto): Promise<Restaurant> {
    return this.restaurantRepository.save(restaurant);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.restaurantRepository.delete(id);
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne(id);
  }

  async update(
    id: number,
    restaurant: RestaurantUpdateDto,
  ): Promise<Restaurant> {
    if (await this.restaurantRepository.findOne(id)) {
      if (restaurant.id !== id) {
        restaurant.id = id;
      }
      return this.restaurantRepository.save(restaurant);
    } else {
      return undefined;
    }
  }
}
