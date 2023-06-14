import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../dto/order.dto';
import { Book } from '../entities/book.entity';
import { JwtPayload } from '../../auth/strategies/jwt.interface';
import { User } from '../../user/entities';
import {
  PaginationQuery,
  PaginationResponse,
} from '../../../utils/pagination/pagination.dto';
import { paginate } from '../../../utils/pagination/paginate';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async get(queryDto: PaginationQuery, payload: JwtPayload) {
    const query = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.book', 'book')
      .where(`order.user_id = :user_id`, { user_id: payload.id });

    paginate(query, queryDto);

    const [orders, total] = await query.getManyAndCount();

    return new PaginationResponse(orders, total, queryDto);
  }

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

  async cancel(id: string, payload: JwtPayload) {
    const order = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.book', 'book')
      .where(`order.user_id = :user_id`, { user_id: payload.id })
      .getOne();

    if (!order) {
      throw new NotFoundException();
    }

    const user = await this.userRepo.findOneBy({ id: payload.id });

    user.points = user.points + order.book.price;
    await user.save();

    await order.softRemove();
  }
}
