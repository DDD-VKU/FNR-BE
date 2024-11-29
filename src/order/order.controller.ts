import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/api-response';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create order' })
  @Post()
  @Public()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const result = await this.orderService.createOrder(createOrderDto);
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
