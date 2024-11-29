import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator/types/decorator/common/IsNotEmpty';
import { IsEnum } from 'class-validator';
import { Type_Payment } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty({ enum: Type_Payment })
  @IsNotEmpty()
  //   @IsEnum(Type_Payment, { message: 'Payment method is not valid' })
  paymentMethod: Type_Payment;

  @ApiProperty()
  @IsNotEmpty()
  subtotal: number;
}
export class CreateOrderDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;
  productId: number;
}
