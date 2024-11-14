import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';

const providers = [AppService, AppRepository];
@Module({
  imports: [PrismaModule, CustomerModule, ProductModule],
  controllers: [AppController],
  providers: providers,
})
export class AppModule {}
