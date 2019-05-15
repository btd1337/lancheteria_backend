import { Restaurant } from 'src/restaurants/restaurant.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { MenuModule } from './menu/menu.module';



@Module({
  controllers: [RestaurantsController],
  imports: [TypeOrmModule.forFeature([Restaurant]), MenuModule],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
