import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';

const providers = [
  AppService,
  AppRepository,
  { provide: APP_GUARD, useClass: AtGuard },
];
@Module({
  imports: [PrismaModule, CustomerModule, AuthModule, ProductModule, CartModule],
  controllers: [AppController],
  providers: providers,
})
export class AppModule {}
