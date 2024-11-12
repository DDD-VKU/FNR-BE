// cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async deleteCart(customer_id: number) {
    return this.cartRepository.deleteCart(customer_id);
  }
}
