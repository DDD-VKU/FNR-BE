// cart.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Cart } from './entities/cart.entity';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findCartByCustomerId(customer_id: number) {
    const cart = await this.prismaService.carts.findFirst({
      where: { customer_id },
    });
    console.log(cart);
    return cart;
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
      where: { cart_id: findCart.id },
    });
    return result;
  }

  // Tính tổng các sản phẩm trong giỏ hàng của khách hàng
  async countTotal(customer_id: number): Promise<number> {
    const cartItems = await this.prismaService.cart_items.findMany({
      where: { carts: { customer_id } },
      select: {
        price: true,
        quantity: true,
      },
    });

    // Tính tổng giá trị giỏ hàng
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
}
