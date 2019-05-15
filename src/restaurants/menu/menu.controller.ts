import { Controller, Get, Param } from '@nestjs/common';

import { MenuItem } from './menu-item/menu-item.entity';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(@Param('id') id): Promise<MenuItem[]> {
    return this.menuService.findAllByRestaurantId(+id);
  }
}
