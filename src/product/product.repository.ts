import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { equal } from 'assert';

@Injectable()
export class ProductRepository {
  async findOne(id: number) {
    const product = await this.prismaService.products.findUnique({
      where: { id: id },
      include: {
        products_variants: true,
        products_details: {
          include: {
            dimensions: true,
            warrantys: true,
            general: true,
          },
        },
        products_images: true,
        products_prices: true,
        categories: true,
      },
    });
    return product;
  }
  async createProduct(createProductDto: CreateProductDto) {
    const products_variants = {
      size: ['S', 'M', 'L'],
      color: ['purple', 'yellow', 'black'],
    };
    try {
      const result = await this.prismaService.products.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          categories_id: createProductDto.categories_id,
          SKU: createProductDto.SKU,
          tags: createProductDto.tags,
          products_variants: {
            create: products_variants,
          },
          products_details: {
            create: {
              long_description: createProductDto.details.long_description,
              sort_description: createProductDto.details.sort_description,
              dimensions: {
                create: createProductDto.details.dimensions,
              },
              warrantys: {
                create: createProductDto.details.warranty,
              },
              general: {
                create: createProductDto.details.general,
              },
            },
          },
          products_images: {
            create: createProductDto.product_images,
          },
          products_prices: {
            create: createProductDto.prices,
          },
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(data: CreateCategoryDto) {
    try {
      const result = await this.prismaService.categories.create({
        data: data,
      });
      return result;
    } catch (error) {
      return null;
    }
  }

  // lấy product theo category
  async getProductByCategory(category_id: number) {
    const result = await this.prismaService.products.findMany({
      where: { categories_id: category_id },
      include: {
        products_variants: true,
        products_images: true,
        products_details: {
          include: {
            dimensions: true,
            warrantys: true,
            general: true,
          },
        },
        products_prices: true,
        categories: true,
      },
    });
    console.log(result);
    const products = result.map((item: any) => {
      item.products_images = item.products_images?.images[0] ?? '';
      item.price = item.products_prices.price;
      item.sale_percent = item.products_prices.sale_percent;
      delete item.products_prices;
      return item;
    });

    return products;
  }

  //lấy tất cả product
  async findAll() {
    const result = await this.prismaService.products.findMany({
      include: {
        // products_variants: true,
        products_images: true,
        // products_details: true,
        products_prices: true,
      },
    });

    console.log(result[0]);

    const products = result.map((item: any) => {
      item.image = item.products_images?.images[0] ?? '';
      item.products_images = item.products_images?.images[0] ?? '';
      item.price = item.products_prices.price;
      item.sale_percent = item.products_prices.sale_percent;
      delete item.products_prices;
      delete item.products_images;
      return item;
    });

    return products;
  }
}
