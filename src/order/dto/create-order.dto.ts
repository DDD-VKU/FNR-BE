import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { Type_Payment } from '@prisma/client';
export class CreateOrderDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  product_id: number;
}

export class CreateOrderDto {
  @ApiProperty({ enum: Type_Payment })
  @IsNotEmpty()
  payment_method: Type_Payment;

  @ApiProperty()
  @IsNotEmpty()
  subtotal: number;

  // @ApiProperty()
  // @IsNotEmpty()
  // customer_id: number;

  @ApiProperty()
  @IsNotEmpty()
  addressId: number;

  @ApiProperty({
    type: [CreateOrderDetailDto],
  })
  orderDetails: CreateOrderDetailDto[];
}
