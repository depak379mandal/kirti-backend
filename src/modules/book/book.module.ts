import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { BookService } from './services/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Order } from './entities/order.entity';
import { User } from '../user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Order, User])],
  controllers: [BookController, OrderController],
  providers: [OrderService, BookService],
})
export class BookModule {}
