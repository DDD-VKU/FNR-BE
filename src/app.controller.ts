import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('hello')
  postHello() {
    return {
      status: HttpStatus.OK,
      message: 'Hello World!',
    };
  }

  @Get('healh-check')
  @HttpCode(HttpStatus.OK)
  postHelloCheck() {
    return {
      status: HttpStatus.OK,
      message: 'Hello World!',
    };
  }
}
