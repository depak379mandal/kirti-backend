import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQuery } from '../../../utils/pagination/pagination.dto';
import { BookService } from '../services/book.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller({
  version: '1',
  path: 'books',
})
export class BookController {
  constructor(private service: BookService) {}

  @Get()
  get(@Query() queryDto: PaginationQuery) {
    return this.service.get(queryDto);
  }
}
