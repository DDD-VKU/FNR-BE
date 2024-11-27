import { ApiProperty } from '@nestjs/swagger';
import { CartAction } from '../entities/cart-action';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  product_id?: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity?: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price?: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;
  @ApiProperty({ enum: CartAction })
  @IsNotEmpty()
  action: CartAction;
}
