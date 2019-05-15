import { RouterModule } from 'nest-router';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { routes } from './app.routes';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    UsersModule,
    RestaurantsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
