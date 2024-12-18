import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderRepository } from './order.repository';

const providers = [OrderService, OrderRepository];
@Module({
  controllers: [OrderController],
  providers: providers,
  imports: [PrismaModule],
  exports: providers,
})
export class OrderModule {}
