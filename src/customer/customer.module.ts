import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

const providers = [CustomerService, CustomerRepository];
@Module({
  controllers: [CustomerController],
  providers: providers,
  imports: [PrismaModule],
  exports: providers,
})
export class CustomerModule {}
