import { IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  book_id: string;
}
