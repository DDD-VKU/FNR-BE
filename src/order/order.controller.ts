import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDetailDto, CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/api-response';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create order' })
  @Post(':id')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Body() createOrderdetail: CreateOrderDetailDto[],
  ) {
    const result = await this.orderService.createOrder(
      createOrderDto,
      createOrderdetail,
    );
    if (result) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.OK,
        'Order added successfully',
      );
    } else {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to add order',
      );
    }
  }
}
