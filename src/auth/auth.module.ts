import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [RtStrategy, AtStrategy],
  controllers: [AuthController],
  imports: [JwtModule.register({})],
})
export class AuthModule { }
