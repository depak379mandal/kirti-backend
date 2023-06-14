import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from '../dto/order.dto';
import { OrderService } from '../services/order.service';
import { UserParam } from '../../auth/decorators';
import { JwtPayload } from '../../auth/strategies/jwt.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Orders')
@UseGuards(AuthGuard('jwt'))
@Controller({
  version: '1',
  path: 'orders',
})
export class OrderController {
  constructor(private service: OrderService) {}

  @Post()
  get(@Body() createDto: CreateOrderDto, @UserParam() payload: JwtPayload) {
    return this.service.create(createDto, payload);
  }
}
