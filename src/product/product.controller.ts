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
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Public()
  @Get('/category')
  async findAllCategory() {
    const result = await this.productService.findAllCategory();
    try {
      return ApiResponse.buildCollectionApiResponse(
        result,
        HttpStatus.OK,
        'Category fetched successfully',
      );
    } catch (error) {
      console.error('Error fetching category:', error);
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch category',
      );
    }
  }
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
  @ApiBearerAuth('JWT-auth')
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
  @Get('/category/:category_id')
  @Public()
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
      return ApiResponse.buildApiResponse(
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

  @Patch('category/:id')
  @ApiBearerAuth('JWT-auth')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: any,
  ) {
    const result = await this.productService.updateCategory(
      +id,
      updateCategoryDto,
    );
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.OK,
        'Category updated successfully',
      );
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to update category',
      );
    }
  }

  @Delete('category/:id')
  @ApiBearerAuth('JWT-auth')
  async deleteCategory(@Param('id') id: string) {
    const result = await this.productService.deleteCategory(+id);
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.OK,
        'Category deleted successfully',
      );
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to delete category',
      );
    }
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result = await this.productService.updateProduct(
      +id,
      updateProductDto,
    );
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.OK,
        'Product updated successfully',
      );
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to update product',
      );
    }
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  async deleteProduct(@Param('id') id: string) {
    const result = await this.productService.deleteProduct(+id);
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.OK,
        'Product deleted successfully',
      );
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to delete product',
      );
    }
  }
}
