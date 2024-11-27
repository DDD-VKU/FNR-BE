import { CartAction } from './cart-action';

export class Cart {
  product_id: number;
  quantity: number;
  customer_id: number;
  action: CartAction;
}
