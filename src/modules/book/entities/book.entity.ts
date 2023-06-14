import { Column, Entity, OneToMany } from 'typeorm';
import { EntityHelper } from '../../../utils/typeorm/entity.util';
import { Order } from './order.entity';

@Entity({ name: 'books' })
export class Book extends EntityHelper {
  @Column()
  title: string;

  @Column()
  writer: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column('varchar', { array: true })
  tags: string[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
