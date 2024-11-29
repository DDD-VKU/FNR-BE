import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto, CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrder(
    createOrderDto: CreateOrderDto,
    createOrderdetail: CreateOrderDetailDto[],
  ) {
    try {
      const createOrder = await this.prismaService.orders.create({
        data: {
          payment_method: createOrderDto.paymentMethod,
          subtotal: createOrderDto.subtotal,
          customer_id: 1,
        },
      });
      // create order detail
      for (const detail of createOrderdetail) {
        await this.prismaService.order_details.create({
          data: {
            order_id: createOrder.id,
            product_id: detail.productId,
            quantity: detail.quantity,
            price: detail.price,
          },
        });
      }

      return createOrder;
    } catch (error) {
      console.log('Lỗi: ', error);
      return null;
    }
  }
}
