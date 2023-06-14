import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityHelper } from '../../../utils/typeorm/entity.util';
import { Book } from './book.entity';
import { User } from '../../user/entities';

@Entity({ name: 'orders' })
export class Order extends EntityHelper {
  @Column('uuid')
  book_id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => Book, (book) => book.orders)
  @JoinColumn({
    name: 'book_id',
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
