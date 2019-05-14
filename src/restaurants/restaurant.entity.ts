import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { MenuItem } from './menu/menu-item/menu-item.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(type => MenuItem, menuItem => menuItem.restaurant)
  menu: MenuItem[];
}
