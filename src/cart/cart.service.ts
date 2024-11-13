// cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async deleteCart(customer_id: number) {
    return this.cartRepository.deleteCart(customer_id);
  }

  async countTotal(customer_id: number) {
    try {
      const sum = await this.cartRepository.countTotal(customer_id);
      return sum;
    } catch (error) {
      throw new NotFoundException('Cart not found for this user');
    }
  }
}
