// cart.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Cart } from './entities/cart.entity';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // async findCart(customer_id: number) {
  //   const result = await this.prismaService.carts.findFirst({
  //     where: {
  //       customer_id: customer_id,
  //     },
  //   });
  //   return result;
  // }

  // async deleteCart(customer_id: number) {
  //   const cartId = await this.findCart(customer_id);
  //   if (cartId == null) {
  //     throw new NotFoundException('Cart not found for this user');
  //   } else {
  //     await this.prismaService.cartId.deleteMany({
  //       where: {
  //         id: cartId.id,
  //       },
  //     });
  //     return cartId;
  //   }
  // }

  async countTotal(customer_id: number): Promise<number> {
    const cartItems = await this.prismaService.cart_items.findMany({
      where: { carts: { customer_id } },
      select: {
        price: true,
        quantity: true,
      },
    });

    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  async deleteCart(customer_id: number) {
    const findCart = await this.prismaService.carts.findFirst({
      where: {
        id: customer_id,
      },
    });
    if (findCart == null) {
      throw new NotFoundException('Cart not found for this user');
    }

    const result = await this.prismaService.cart_items.deleteMany({
      where: { id: findCart.id },
    });
    return result;
  }
}
