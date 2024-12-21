import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DimensionsDto {
  @ApiPropertyOptional({
    description: 'Width of the product in units',
    example: 20.5,
  })
  @Type(() => Number)
  width?: number;

  @ApiPropertyOptional({
    description: 'Height of the product in units',
    example: 15.0,
  })
  @Type(() => Number)
  height?: number;

  @ApiPropertyOptional({
    description: 'Depth of the product in units',
    example: 10.0,
  })
  @Type(() => Number)
  depth?: number;

  @ApiPropertyOptional({
    description: 'Weight of the product in kilograms',
    example: 2.5,
  })
  @Type(() => Number)
  weight?: number;
}

export class WarrantyDto {
  @ApiPropertyOptional({ description: 'Summary of the warranty' })
  warranty_summary?: string;

  @ApiPropertyOptional({ description: 'Type of warranty service provided' })
  warranty_service_type?: string;

  @ApiPropertyOptional({
    description: 'Details of what is covered under the warranty',
  })
  covered_in_warranty?: string;

  @ApiPropertyOptional({
    description: 'Details of what is not covered under the warranty',
  })
  not_covered_in_warranty?: string;

  @ApiPropertyOptional({
    description: 'Information about the domestic warranty',
  })
  domestic_warranty?: string;
}

export class GeneralDto {
  @ApiPropertyOptional({ description: 'Sales package details' })
  sales_package?: string;

  @ApiPropertyOptional({ description: 'Model number of the product' })
  model_number?: string;

  @ApiPropertyOptional({
    description: 'Secondary material used in the product',
  })
  secondary_material?: string;

  @ApiPropertyOptional({ description: 'Configuration details of the product' })
  configuration?: string;

  @ApiPropertyOptional({
    description: 'Upholstery material used in the product',
  })
  upholstery_material?: string;

  @ApiPropertyOptional({ description: 'Color of the upholstery' })
  upholstery_color?: string;
}

export class ProductImageDto {
  id?: number;
  @ApiProperty({
    description: 'List of image URLs',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  images: string[];
}

export class ProductVariantDto {
  @ApiProperty({
    description: 'Available sizes for the product',
    example: ['S', 'M', 'L'],
  })
  size: string[];

  @ApiProperty({
    description: 'Available colors for the product',
    example: ['red', 'blue', 'green'],
  })
  color: string[];
}

export class ProductDetailsDto {
  @ApiProperty({ description: 'Short description of the product' })
  sort_description: string;

  @ApiProperty({ description: 'Long description of the product' })
  long_description: string;

  @ApiPropertyOptional({
    type: DimensionsDto,
    description: 'Dimensions of the product',
  })
  dimensions?: DimensionsDto;

  @ApiPropertyOptional({
    type: WarrantyDto,
    description: 'Warranty information for the product',
  })
  warranty?: WarrantyDto;

  @ApiPropertyOptional({
    type: GeneralDto,
    description: 'General information about the product',
  })
  general?: GeneralDto;
}

export class ProductPriceDto {
  @ApiProperty({ description: 'Price of the product', example: 19.99 })
  price: number;

  @ApiProperty({ description: 'Sale percentage of the product', example: 10 })
  sale_percent: number;
}

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  name: string;

  @ApiPropertyOptional({ description: 'Short description of the product' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Stock Keeping Unit identifier for the product',
  })
  SKU?: string;

  @ApiProperty({
    description: 'Tags associated with the product',
    example: ['electronics', 'gadgets'],
  })
  tags: string[];

  @ApiPropertyOptional({
    description: 'ID of the category to which the product belongs',
  })
  categories_id?: number;

  @ApiPropertyOptional({
    type: ProductImageDto,
    description: 'List of product images',
  })
  products_images?: ProductImageDto;

  @ApiPropertyOptional({
    type: ProductDetailsDto,
    description: 'Detailed information about the product',
  })
  products_details?: ProductDetailsDto;

  @ApiPropertyOptional({
    type: ProductPriceDto,
    description: 'List of product prices',
  })
  products_prices?: ProductPriceDto;
}
