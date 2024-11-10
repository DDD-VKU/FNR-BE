import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Tan Duc',
  })
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;
}
