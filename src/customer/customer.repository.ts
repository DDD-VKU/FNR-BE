import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class CustomerRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findOneCustomer(id: number) {
    try {
      const result = await this.prismaService.customers.findUnique({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }

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
      console.log(error);
      return null;
    }
  }
  async createCustomer(customer: CreateCustomerDto) {
    try {
      const result = await this.prismaService.customers.create({
        data: {
          ...customer,
          carts: {
            create: {},
          },
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }

  //xóa customer
  async deleteCustomer(id: number) {
    try {
      const result = await this.prismaService.customers.delete({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //tìm địa chỉ customer theo id

  async findAllAddressByCustomerId(id: number) {
    try {
      const result = await this.prismaService.address.findMany({
        where: {
          customer_id: id,
        },
      });
      return result;
    } catch (error) {
      return null;
    }
  }
}
