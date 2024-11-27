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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiResponse } from 'src/common/api-response';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  @ApiBearerAuth('JWT-auth')
  async getCartUser(@GetCurrentUser() data: any) {
    try {
      const customer_id = data.sub;
      const cartUser = await this.cartService.findOne(customer_id);
      return ApiResponse.buildApiResponse(cartUser, HttpStatus.OK, 'Success');
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Patch()
  @ApiBearerAuth('JWT-auth')
  async updateCart(
    @GetCurrentUser() data: any,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    try {
      const customer_id = data.sub;
      const updateCart = await this.cartService.updateCart(
        customer_id,
        updateCartDto,
      );
      return ApiResponse.buildApiResponse(updateCart, HttpStatus.OK, 'Success');
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
