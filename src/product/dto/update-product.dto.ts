import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id?: number;
  products_variants?: any;
  products_details?: any;
  product_images?: any;
  products_prices?: any;
  products_images?: any;
}
