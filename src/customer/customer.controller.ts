import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { ApiResponse } from 'src/common/api-response';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Create customer' })
  @Post()
  @Public()
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

  @ApiBearerAuth('JWT-auth')
  @Get()
  async findAll() {
    const result = await this.customerService.findAll();
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
  //xóa customer
  @ApiOperation({ summary: 'Delete customer' })
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    const result = await this.customerService.delete(+id);
    if (result) {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.OK,
        'Customer deleted successfully',
      );
    } else {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to delete customer',
      );
    }
  }

  // tìm địa chỉ của 1 khách hàng
  @ApiOperation({ summary: 'Get customer address' })
  @Get('address/:id')
  async findAddressByCustomerId(@Param('id') id: string) {
    const result = await this.customerService.findAllAddressByCustomerId(+id);
    if (result) {
      return ApiResponse.buildCollectionApiResponse(
        result,
        HttpStatus.OK,
        'Customer address fetched successfully',
      );
    } else {
      return ApiResponse.buildCollectionApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch customer address',
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOneCustomer(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete('address/:id')
  removeAddress(@Param('id') id: string) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Get('address/:id')
  findAllAddressByCustomerId(@Param('id') id: string) {}
}
