import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/api-response';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { use } from 'passport';
// import { Public } from 'src/auth/decorators/public.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Create order' })
  @Post()
  @ApiBearerAuth('JWT-auth')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetCurrentUser() data: any,
  ) {
    const customerId = data.sub;
    console.log(typeof customerId);
    const result = await this.orderService.createOrder(
      createOrderDto,
      customerId,
    );
    if (result) {
      return ApiResponse.buildApiResponse(
        result,
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
