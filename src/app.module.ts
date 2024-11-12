import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { CartModule } from './cart/cart.module';

const providers = [AppService, AppRepository];
@Module({
  imports: [PrismaModule, CustomerModule, CartModule],
  controllers: [AppController],
  providers: providers,
})
export class AppModule {}
