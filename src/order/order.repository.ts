import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrder(createOrderDto: CreateOrderDto, customer_id: number) {
    try {
      const result = await this.prismaService.orders.create({
        data: {
          payment_method: createOrderDto.payment_method,
          subtotal: createOrderDto.subtotal,
          customer_id: customer_id,
          addressId: createOrderDto.addressId,
          order_detail: {
            createMany: {
              data: createOrderDto.orderDetails,
              // price: createOrderDto.orderDetails.price,
              // quantity: createOrderDto.orderDetails.quantity,
              // product_id: createOrderDto.orderDetails.product_id,
            },
          },
        },
      });

      return result;
    } catch (error) {
      console.log('Lỗi: ', error);
      throw new Error('Error creating order');
      return null;
    }
  }
}
