import {
  Controller,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiResponse } from 'src/common/api-response';
import { ApiOperation } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Delete(':customer_id')
  @ApiOperation({ summary: 'Delete cart' })
  async deleteCart(@Param('customer_id', ParseIntPipe) customer_id: number) {
    await this.cartService.deleteCart(customer_id);
    return ApiResponse.buildApiResponse(
      null,
      HttpStatus.NO_CONTENT,
      'Cart has been deleted',
    );
  }
  //Calculate the total
  @Get(':customer_id/total')
  @ApiOperation({ summary: 'Get cart total' })
  async countTotal(@Param('customer_id') customer_id: number) {
    await this.cartService.countTotal(customer_id);
    return ApiResponse.buildApiResponse(null, HttpStatus.OK, '====Total====');
  }
}
