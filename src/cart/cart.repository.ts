import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getCartUser(id: number) {
    try {
      const result = await this.prismaService.carts.findUnique({
        where: {
          customer_id: id,
        },
        include: {
          cart_item: {
            include: {
              product: {
                include: {
                  products_images: true,
                },
              },
            },
          },
        },
      });

      return result;
    } catch (error) {
      return null;
    }
  }

  async findCartByCustomerId(customer_id: number) {
    return this.prismaService.carts.findUnique({
      where: { customer_id },
      include: { cart_item: true },
    });
  }
  async createCartItem(customer_id: number, data: any) {
    return this.prismaService.carts.create({
      data: {
        customer_id,
        cart_item: { create: data },
      },
    });
  }

  async addCartItem(cart_id: number, data: any) {
    try {
      const result = await this.prismaService.carts.update({
        where: { id: cart_id },
        data: {
          cart_item: {
            create: data,
          },
        },
      });
      return result;
    } catch (error) {
      throw new Error('Failed to add cart item');
    }
  }

  async updateCartItem(customer_id: number, itemId: number, data: any) {
    return this.prismaService.carts.update({
      where: { customer_id },
      data: { cart_item: { update: { where: { id: itemId }, data: data } } },
    });
  }

  async deleteCartItem(customer_id: number, itemId: number) {
    return this.prismaService.carts.update({
      where: { customer_id },
      data: { cart_item: { delete: { id: itemId } } },
    });
  }
  async clearCartItems(customer_id: number) {
    return this.prismaService.carts.update({
      where: { customer_id },
      data: { cart_item: { deleteMany: {} } },
    });
  }
}
