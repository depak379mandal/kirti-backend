import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/order.dto';
import { Book } from '../entities/book.entity';
import { JwtPayload } from '../../auth/strategies/jwt.interface';
import { User } from '../../user/entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createDto: CreateOrderDto, payload: JwtPayload) {
    const book = await this.bookRepo.findOneBy({ id: createDto.book_id });

    if (!book) {
      throw new UnprocessableEntityException({ book_id: 'Book not found' });
    }

    const user = await this.userRepo.findOneBy({ id: payload.id });

    if (user.points < book.price) {
      throw new ForbiddenException("You don't have enough points.");
    }

    user.points = user.points - book.price;
    await user.save();

    return this.orderRepo
      .create({
        book_id: book.id,
        user_id: user.id,
      })
      .save();
  }
}
