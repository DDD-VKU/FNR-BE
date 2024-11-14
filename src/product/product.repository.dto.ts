import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class ProductRepository {
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

  //lấy product theo id và hiện các mối quan hệ với product
  // async getProduct(id: number) {
  //   return await this.prismaService.products.findUnique({
  //     where: { id : id },
  //     include: {
  //       products_variants: true,
  //       products_images: true,
  //       products_details: {
  //         include: {
  //           dimensions: true,
  //           warrantys: true,
  //           general: true
  //         }
  //       },
  //       products_prices: true,
  //       categories: true
  //     }
  //   });
  // }

  // lấy product theo category
  async getProductByCategory(category_id: number) {
    return await this.prismaService.products.findMany({
      where: { id: category_id },
      include: {
        products_variants: true,
        products_images: true,
        products_details: {
          include: {
            dimensions: true,
            warrantys: true,
            general: true
          }
        },
        products_prices: true,
        categories: true
      }
    });
  }

  //lấy tất cả product
  async findAll() {
    return await this.prismaService.products.findMany({
      include: {
        products_variants: true,
        products_images: true,
        products_details: {
          include: {
            dimensions: true,
            warrantys: true,
            general: true
          }
        },
        products_prices: true,
        categories: true
      }
    });
  }

}
