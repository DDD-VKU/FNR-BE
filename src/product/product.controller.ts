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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse } from 'src/common/api-response';
import { ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get product by id' })
  async findOne(@Param('id') id: string) {
    const result = await this.productService.findOne(+id);
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.OK,
        'Product fetched successfully',
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch product',
      );
    }
  }

  @ApiOperation({ summary: 'Create category' })
  @Post('/category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const result = this.productService.createCategory(createCategoryDto);
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.CREATED,
        'Category created successfully',
      );
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to create category',
      );
    }
  }

  @ApiOperation({ summary: 'Get all product by category' })
  @Get(':category_id')
  async getProductByCategory(@Param('category_id') category_id: string) {
    const result = await this.productService.getProductByCategory(+category_id);
    try {
      return ApiResponse.buildCollectionApiResponse(
        result,
        HttpStatus.OK,
        'Product fetched successfully',
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      return ApiResponse.buildCollectionApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch product',
      );
    }
  }

  @ApiOperation({ summary: 'Get all product' })
  @Get()
  @Public()
  async findAllProduct() {
    const result = await this.productService.findAllProduct();
    try {
      return ApiResponse.buildCollectionApiResponse(
        result,
        HttpStatus.OK,
        'Product fetched successfully',
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      return ApiResponse.buildCollectionApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch product',
      );
    }
  }

  @Post()
  @Public()
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productService.create(createProductDto);
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.CREATED,
        'Product created successfully',
      );
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to create product',
      );
    }
  }
}
