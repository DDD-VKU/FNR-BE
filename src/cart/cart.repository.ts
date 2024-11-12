// cart.repository.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { Cart } from './entities/cart.entity';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteCart(customer_id: number) {
    // try {
    const findCart = await this.prismaService.carts.findFirst({
      where: {
        id: customer_id,
      },
    });
    if (findCart == null) {
      throw new NotFoundException('Cart not found for this user');
    }

    const result = await this.prismaService.cart_items.delete({
      where: { id: findCart.id },
    });
    return result;
    // } catch (error) {
    //   throw new InternalServerErrorException('Failed to delete cart items');
    // }
  }
}
