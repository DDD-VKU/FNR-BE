import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './cart.repository';
import { CartAction } from './entities/cart-action';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  async findOne(customer_id: number) {
    const cartUser = await this.cartRepository.getCartUser(customer_id);
    const cartRespon = cartUser.cart_item.map((item: any) => {
      item.name = item.product.name;
      item.image = item.product.products_images.images[0] ?? '';
      delete item.product;
      return item;
    });
    return cartRespon;
  }

  async updateCart(id: number, data: UpdateCartDto) {
    const cartUser = await this.cartRepository.findCartByCustomerId(id);
    if (!cartUser) {
      const newCart = await this.cartRepository.createCartItem(id, {
        product_id: data.product_id,
        quantity: data.quantity,
        price: data.price,
      });
      return newCart;
    }

    const existingItem = cartUser.cart_item.find(
      (item) => item.product_id === data.product_id,
    );

    switch (data.action) {
      case CartAction.ADD: {
        if (!existingItem) {
          return await this.cartRepository.addCartItem(cartUser.id, {
            product_id: data.product_id,
            quantity: data.quantity,
            price: data.price,
          });
        } else {
          return await this.cartRepository.updateCartItem(id, existingItem.id, {
            quantity: { increment: data.quantity },
          });
        }
      }
      case CartAction.REMOVE: {
        if (existingItem) {
          if (existingItem.quantity > data.quantity) {
            return await this.cartRepository.updateCartItem(
              id,
              existingItem.id,
              { quantity: { decrement: data.quantity } },
            );
          } else {
            return await this.cartRepository.deleteCartItem(
              id,
              existingItem.id,
            );
          }
        }
        throw new Error('Product not found in cart');
      }
      case CartAction.CLEAR: {
        return await this.cartRepository.clearCartItems(id);
      }
      default:
        throw new Error('Invalid action');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
