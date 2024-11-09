import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { AccessGuard } from './auth/guard/access-token.guard';
import { APP_GUARD } from '@nestjs/core';

const providers = [
  AppService,
  AppRepository,
  {
    provide: APP_GUARD,
    useClass: AccessGuard,
  },
];
@Module({
  imports: [
    PrismaModule,
    CustomerModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'rM0h6l5IrNeGnYXJ6qxbs3TRyVwqPc4oWQasTRyG',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: providers,
})
export class AppModule { }
