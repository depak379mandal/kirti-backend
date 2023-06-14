import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/order.dto';
import { OrderService } from '../services/order.service';
import { UserParam } from '../../auth/decorators';
import { JwtPayload } from '../../auth/strategies/jwt.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PaginationQuery } from '../../../utils/pagination/pagination.dto';

@ApiTags('Orders')
@UseGuards(AuthGuard('jwt'))
@Controller({
  version: '1',
  path: 'orders',
})
export class OrderController {
  constructor(private service: OrderService) {}

  @Get()
  get(@Query() queryDto: PaginationQuery, @UserParam() payload: JwtPayload) {
    return this.service.get(queryDto, payload);
  }

  @Post()
  create(@Body() createDto: CreateOrderDto, @UserParam() payload: JwtPayload) {
    return this.service.create(createDto, payload);
  }

  @Delete(':id')
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @UserParam() payload: JwtPayload,
  ) {
    return this.service.cancel(id, payload);
  }
}
