import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthRepository } from './auth.repository';
import { CustomerModule } from 'src/customer/customer.module';

const providers = [RtStrategy, AtStrategy, AuthService, AuthRepository];
@Module({
  providers: providers,
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.AT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    PrismaModule,
    CustomerModule,
  ],
})
export class AuthModule {}
