import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRepository } from './product.repository.dto';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService],
  imports: [PrismaModule],
})
export class ProductModule {}
