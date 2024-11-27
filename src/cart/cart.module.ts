import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartRepository } from './cart.repository';

const providers = [CartService, PrismaService, CartRepository];
@Module({
  controllers: [CartController],
  providers: providers,
})
export class CartModule {}
