export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  SKU?: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  categoryId?: number;
  variants?: ProductVariantDto[];
  images?: ProductImageDto[];
  details?: ProductDetailsDto;
}

export class ProductVariantDto {
  size: string[];
  color: string[];
}

export class ProductImageDto {
  images: string[];
}

export class ProductDetailsDto {
  sort_description: string;
  long_description: string;
  dimensions?: DimensionsDto;
  warranty?: WarrantyDto;
  general?: GeneralDto;
}

export class DimensionsDto {
  width?: GLfloat;
  height?: GLfloat;
  depth?: GLfloat;
  weight?: GLfloat;
}

export class WarrantyDto {
  warranty_summary?: string;
  warranty_service_type?: string;
  covered_in_warranty ?: string;
  not_covered_in_warranty ?: string;
  domestic_warranty  ?: string;
}

export class GeneralDto {
  sales_package?: string;
  model_number?: string;
  secondary_material?: string;
  configuration ?: string;
  upholstery_material ?: string;
  upholstery_color ?: string;
}
