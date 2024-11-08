import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class CustomerRepository {
  async findAll() {
    try {
      const result = await this.prismaService.customers.findMany();
      if (result) {
        return result;
      }
    } catch (error) {
      return null;
    }
  }
  async createAddress(address: CreateAddressDto) {
    try {
      const result = await this.prismaService.address.create({
        data: address,
      });

      if (result) {
        return result;
      }
    } catch (error) {
      return null;
    }
  }
  constructor(private readonly prismaService: PrismaService) {}
  async createCustomer(customer: CreateCustomerDto) {
    try {
      const result = await this.prismaService.customers.create({
        data: customer,
      });
      return result;
    } catch (error) {
      return null;
    }
  }
}
