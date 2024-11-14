import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductRepository } from './product.repository.dto';


@Injectable()
export class ProductService {
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


  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
