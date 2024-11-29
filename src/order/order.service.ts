import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.createOrder(createOrderDto);
  }
}
