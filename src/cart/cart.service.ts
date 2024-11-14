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
    // Check customer_id
    const cart = await this.cartRepository.findCartByCustomerId(customer_id);
    if (!cart) {
      throw new NotFoundException('Not found user');
    }

    // Check cart is empty
    const total = await this.cartRepository.countTotal(customer_id);
    if (total === 0) {
      throw new NotFoundException('Cart is empty');
    }

    return { total };
  }
}
