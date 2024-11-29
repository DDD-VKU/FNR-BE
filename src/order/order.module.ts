import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

const providers = [OrderService, OrderController];
@Module({
  controllers: [OrderController],
  providers: providers,
  imports: [PrismaModule],
  exports: providers,
})
export class OrderModule {}
