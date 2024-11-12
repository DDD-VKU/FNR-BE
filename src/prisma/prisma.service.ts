import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  cartItems: any;
  cart: any;
  constructor() {
    super({
      log: ['info'],
    });
  }
}
