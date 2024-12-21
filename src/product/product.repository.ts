import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {
  async deleteProduct(id: number) {
    const result = await this.prismaService.products.delete({
      where: { id },
    });
    return result;
  }
  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    try {
      delete updateProductDto.products_details.dimensions.id;
      const productUpdate: Prisma.productsUpdateInput = {
        name: updateProductDto.name,
        description: updateProductDto.description,
        categories: {
          connect: {
            id: updateProductDto.categories_id,
          },
        },
        SKU: updateProductDto.SKU,
        tags: updateProductDto.tags,
        products_details: {
          update: {
            long_description:
              updateProductDto.products_details.long_description,
            sort_description:
              updateProductDto.products_details.sort_description,
            dimensions: {
              update: {
                data: {
                  depth: updateProductDto.products_details.dimensions.depth,
                  height: updateProductDto.products_details.dimensions.height,
                  weight: updateProductDto.products_details.dimensions.weight,
                  width: updateProductDto.products_details.dimensions.width,
                },
              },
            },
            warranty: {
              update: updateProductDto.products_details.warranty,
            },
            general: {
              update: {
                where: {
                  id: updateProductDto.products_details.general.id,
                },
                data: {
                  model_number:
                    updateProductDto.products_details.general.model_number,
                  sales_package:
                    updateProductDto.products_details.general.sales_package,
                  secondary_material:
                    updateProductDto.products_details.general
                      .secondary_material,
                  upholstery_color:
                    updateProductDto.products_details.general.upholstery_color,
                  upholstery_material:
                    updateProductDto.products_details.general
                      .upholstery_material,
                  configuration:
                    updateProductDto.products_details.general.configuration,
                },
              },
            },
          },
        },
        products_images: {
          update: {
            images: updateProductDto.products_images.images,
          },
        },
        products_prices: {
          update: {
            price: updateProductDto.products_prices.price,
            sale_percent: updateProductDto.products_prices.sale_percent,
          },
        },
      };
      const result = await this.prismaService.products.update({
        where: { id },
        data: productUpdate,
      });

      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  async deleteCategory(id: number) {
    const result = await this.prismaService.categories.delete({
      where: { id },
    });
    return result;
  }
  async updateCategory(id: number, updateCategoryDto: any) {
    delete updateCategoryDto.id;
    const result = await this.prismaService.categories.update({
      where: { id: id },
      data: {
        name: updateCategoryDto.name,
      },
    });
    return result;
  }
  async findAllCategory() {
    const result = await this.prismaService.categories.findMany({
      orderBy: { id: 'asc' },
    });
    return result;
  }
  async findOne(id: number) {
    const product = await this.prismaService.products.findUnique({
      where: { id: id },
      include: {
        products_variants: true,
        products_details: {
          include: {
            dimensions: true,
            warranty: true,
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
              long_description:
                createProductDto.products_details.long_description,
              sort_description:
                createProductDto.products_details.sort_description,
              dimensions: {
                create: {
                  depth: Number(
                    createProductDto.products_details.dimensions.depth,
                  ),
                  height: Number(
                    createProductDto.products_details.dimensions.height,
                  ),
                  weight: Number(
                    createProductDto.products_details.dimensions.weight,
                  ),
                  width: Number(
                    createProductDto.products_details.dimensions.width,
                  ),
                },
              },
              warranty: {
                create: createProductDto.products_details.warranty,
              },
              general: {
                create: createProductDto.products_details.general,
              },
            },
          },
          products_images: {
            create: createProductDto.products_images,
          },
          products_prices: {
            create: {
              price: Number(createProductDto.products_prices.price),
              sale_percent: Number(
                createProductDto.products_prices.sale_percent,
              ),
            },
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
            warranty: true,
            general: true,
          },
        },
        products_prices: true,
        categories: true,
      },
    });
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
      orderBy: { id: 'asc' },
    });

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
