import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuItem } from './menu-item/menu-item.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([MenuItem])],
  providers: [MenuService]
})
export class MenuModule {}
