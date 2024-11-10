import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class CustomerService {
  [x: string]: any;
  constructor(private readonly customerRepository: CustomerRepository) {}
  async create(customer: CreateCustomerDto) {
    return await this.customerRepository.createCustomer(customer);
  }

  async createAddress(address: CreateAddressDto) {
    return await this.customerRepository.createAddress(address);
  }

  async findAllCustomers() {
    return await this.customerRepository.findAllCustomers();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async findAddressById(id: number) {
    return await this.customerRepository.findAddressById(id);
  }

  async deleteAddress(id: number) {
    const address = await this.customerRepository.findAddressById(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    } else {
      return await this.customerRepository.deleteAddress(id);
    }
  }
  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customerRepository.updateCustomer(
      id,
      updateCustomerDto,
    );
    if (!updatedCustomer) {
      throw new NotFoundException('Customer not found');
    }
    return updatedCustomer;
  }
}
