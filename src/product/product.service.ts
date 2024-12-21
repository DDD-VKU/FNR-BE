import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  async deleteCategory(id: number) {
    return await this.productRepository.deleteCategory(id);
  }
  async updateCategory(id: number, updateCategoryDto: any) {
    return await this.productRepository.updateCategory(id, updateCategoryDto);
  }
  async findAllCategory() {
    return await this.productRepository.findAllCategory();
  }
  constructor(private readonly productRepository: ProductRepository) {}

  //tạo category
  async createCategory(data: CreateCategoryDto) {
    return await this.productRepository.createCategory(data);
  }

  //tìm product theo id vầ hiện các mối quan hệ với prodcut
  // async getProduct(product_id: number) {
  //   return await this.productRepository.getProduct(product_id);
  // }

  //tìm product theo category
  async getProductByCategory(category_id: number) {
    return await this.productRepository.getProductByCategory(category_id);
  }

  //lấy tất cả product
  async findAllProduct() {
    return await this.productRepository.findAll();
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.createProduct(createProductDto);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
