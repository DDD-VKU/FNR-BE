import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAddressDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  customer_id: number;
  @ApiProperty({
    example: 'Ho Chi Minh City',
  })
  @IsString()
  city: string;
  @ApiProperty({
    example: 'Viet Nam',
  })
  @IsString()
  country: string;
  @ApiProperty({ example: 'Da Nang' })
  @IsString()
  province: string;
  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @Matches(/^\d{6}$/, { message: 'Zipcode must be exactly 6 digits' })
  zipcode: string;
  @ApiProperty({
    example: 'Vo',
  })
  @IsString()
  first_name: string;
  @ApiProperty({
    example: 'Tan Dat',
  })
  @IsString()
  last_name: string;
  @ApiProperty({ example: '0329672303' })
  @IsString()
  @Matches(/^\d{10,11}?$/, { message: 'Invalid phone number' })
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
