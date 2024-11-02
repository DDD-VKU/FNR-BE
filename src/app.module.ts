import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';
import { EmailService } from './email/email.service';
import { PrismaModule } from './prisma/prisma.module';

const providers = [AppService, AppRepository];
@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: providers,
})
export class AppModule {}
