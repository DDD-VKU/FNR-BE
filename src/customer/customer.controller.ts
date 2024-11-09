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
import { ApiOperation } from '@nestjs/swagger';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Create customer' })
  @Post()
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
