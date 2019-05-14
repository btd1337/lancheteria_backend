import { Restaurant } from 'src/restaurants/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('float')
  price: number;

  @ManyToOne(type => Restaurant, restaurant => restaurant.menu)
  restaurant: Restaurant;
}
