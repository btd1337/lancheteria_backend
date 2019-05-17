import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MenuItem } from './menu-item/menu-item.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuRepository: Repository<MenuItem>
  ) {}

  async findAllItemsByRestaurantId(id: number): Promise<MenuItem[]> {
    return this.menuRepository.find({
      restaurant: { id }
    });
  }
}
