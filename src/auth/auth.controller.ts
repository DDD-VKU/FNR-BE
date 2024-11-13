import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/common/api-response';
import { GetCurrentUser } from './decorators/get-current-user.decorator';
import { AtGuard } from './guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() params: RegisterDto) {
    try {
      const result = await this.authService.register(params);
      return ApiResponse.buildApiResponse(result, HttpStatus.OK, 'Success');
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Public()
  @Post('login')
  async login(@Body() params: LoginDto) {
    try {
      const result = await this.authService.login(params);
      return ApiResponse.buildApiResponse(result, HttpStatus.OK, 'Success');
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        error.message,
      );
    }
  }

  @Get('check-token')
  @ApiBearerAuth('JWT-auth')
  async checkToken(@GetCurrentUser() data: string) {
    return {
      status: 200,
      message: 'Success',
      data,
    };
  }
}
