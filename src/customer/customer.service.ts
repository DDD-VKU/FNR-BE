import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async create(customer: CreateCustomerDto) {
    return await this.customerRepository.createCustomer(customer);
  }

  async createAddress(address: CreateAddressDto) {
    return await this.customerRepository.createAddress(address);
  }

  async findAll() {
    return await this.customerRepository.findAll();
  }

  async findOneCustomer(id: number) {
    return await this.customerRepository.findOneCustomer(id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  //xóa customer
  async delete(id: number) {
    return await this.customerRepository.deleteCustomer(id);
  }

  //tìm địa chỉ của customer theo id
  async findAllAddressByCustomerId(id: number) {
    return await this.customerRepository.findAllAddressByCustomerId(id);
  }
}
