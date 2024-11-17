import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiResponse } from 'src/common/api-response';
import { ApiOperation } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  //tạo category
  @ApiOperation({ summary: 'Tạo category' })
  @Post('/category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const result = this.productService.createCategory(createCategoryDto);
    try {
      return ApiResponse.buildApiResponse(
        result,
        HttpStatus.CREATED,
        'Category created successfully'
      );
    } catch (error) {
      return ApiResponse.buildApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to create category'
      );
    }
  }

  // @ApiOperation({ summary: ' lấy product với tất cả các bảng quan hệ với nó' })
  // @Get('product_id')
  // async getProduct(@Param('product_id') product_id: string) {
  //   const result = await this.productService.getProduct(+product_id);
  //   try {
  //     return ApiResponse.buildCollectionApiResponse(
  //       result,
  //       HttpStatus.OK,
  //       'Product fetched successfully'
  //     );
  //   } catch (error) {
  //     console.error('Error fetching product:', error);
  //     return ApiResponse.buildCollectionApiResponse(
  //       null,
  //       HttpStatus.BAD_REQUEST,
  //       'Fail to fetch product'
  //     );
  //   }
  // }

  @ApiOperation({ summary: ' lấy product có cùng category' })
  @Get('category/:category_id')
  async getProductByCategory(@Param('category_id') category_id: string) {
    const result = await this.productService.getProductByCategory(+category_id);
    try {
      return ApiResponse.buildCollectionApiResponse(
        result,
        HttpStatus.OK,
        'Product fetched successfully'
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      return ApiResponse.buildCollectionApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch product'
      );
    }
  }

  @ApiOperation({ summary: ' lấy tất cả product' })
  @Get('category')
  async findAllProduct() {
    const result = await this.productService.findAllProduct();
    try {
      return ApiResponse.buildCollectionApiResponse(
        result,
        HttpStatus.OK,
        'Product fetched successfully'
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      return ApiResponse.buildCollectionApiResponse(
        null,
        HttpStatus.BAD_REQUEST,
        'Fail to fetch product'
      );
    }
  }



  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
