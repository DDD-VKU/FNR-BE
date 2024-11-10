import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { ApiResponse } from 'src/common/api-response';
import { ApiOperation } from '@nestjs/swagger';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create customer' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const result = await this.customerService.create(createCustomerDto);
    if (result) {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.CREATED,
        'Customer created successfully',
      );
    } else {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to create customer',
      );
    }
  }

  @Post('address')
  createAddress(@Body() createAddressDto: CreateAddressDto) {
    const result = this.customerService.createAddress(createAddressDto);
    if (result) {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.CREATED,
        'Address created successfully',
      );
    } else {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to create address',
      );
    }
  }

  @Get()
  async findAllCustomers() {
    const result = await this.customerService.findAllCustomers();
    if (result) {
      return ApiResponse.buildCollectionApiResponse(
        result,
        HttpStatus.OK,
        'Customer fetched successfully',
      );
    } else {
      return ApiResponse.buildCollectionApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch customer',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.customerService.findOne(+id);
      if (result) {
        return ApiResponse.buildApiResponse(
          result,
          HttpStatus.OK,
          'Customer fetched successfully',
        );
      } else {
        throw new NotFoundException('Customer not found');
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while fetching customer',
      );
    }
  }

  @Delete('address/:id')
  @ApiOperation({ summary: 'Delete address by id' })
  async deleteAddress(@Param('id') id: string) {
    await this.customerService.deleteAddress(+id);
    return ApiResponse.buildApiResponse(
      null,
      HttpStatus.NO_CONTENT, // 204
      'Address deleted successfully',
    );
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Update customer by id' })
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const result = await this.customerService.update(+id, updateCustomerDto);
    if (result) {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.OK,
        'Customer updated successfully',
      );
    } else {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to update customer',
      );
    }
  }
}
