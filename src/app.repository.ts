import { Injectable } from '@nestjs/common';

@Injectable()
export class AppRepository {
  constructor() {}

  postHello(): string {
    return 'Hello World!';
  }
}
