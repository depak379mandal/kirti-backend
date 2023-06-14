import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Repository } from 'typeorm';
import {
  PaginationQuery,
  PaginationResponse,
} from '../../../utils/pagination/pagination.dto';
import { paginate } from '../../../utils/pagination/paginate';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async get(queryDto: PaginationQuery) {
    const query = this.bookRepo.createQueryBuilder('book');

    paginate(query, queryDto);

    const [books, total] = await query.getManyAndCount();

    return new PaginationResponse(books, total, queryDto);
  }
}
