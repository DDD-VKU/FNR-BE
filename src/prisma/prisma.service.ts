import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  cartItems: any;
  cart: any;
  find: any;
  cartId: any;
  constructor() {
    super({
      log: ['info'],
    });
  }
}
