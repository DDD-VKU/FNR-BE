import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerRepository {
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  async findAllCustomers() {
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
  async findAddressById(id: number) {
    try {
      const result = await this.prismaService.address.findUnique({
        where: { id },
      });
      return result;
    } catch (error) {
      return null;
    }
  }

  async deleteAddress(id: number): Promise<void> {
    const address = await this.findAddressById(id);
    // console.log(address);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    try {
      await this.prismaService.address.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Fail to delete address');
    }
  }
  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const result = await this.prismaService.customers.update({
        where: { id },
        data: updateCustomerDto,
      });
      return result;
    } catch (error) {
      console.error('Error in updateCustomer:', error);
      return null;
    }
  }
}
