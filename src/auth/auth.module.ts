import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  providers: [RtStrategy, AtStrategy, AuthService],
  controllers: [AuthController],
  imports: [JwtModule.register({})],
})
export class AuthModule { }
