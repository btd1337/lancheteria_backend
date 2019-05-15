import { Routes } from 'nest-router';

import { MenuModule } from './restaurants/menu/menu.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';

export const routes: Routes = [
  {
    path: 'users',
    module: UsersModule
  },
  {
    path: 'restaurants',
    module: RestaurantsModule,
    children: [
      {
        path: ':id/menu',
        module: MenuModule
      }
    ]
  }
];
