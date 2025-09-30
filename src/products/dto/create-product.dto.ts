// src/products/dto/create-product.dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Handmade Silver Necklace' })
  @IsString()
  @MaxLength(255)
  product_name: string;

  @ApiPropertyOptional({ example: 'Beautiful handcrafted silver necklace' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 89.99 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: 15 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  inventory: number;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsUrl()
  @IsOptional()
  @MaxLength(500)
  prod_image_url?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  category_id: number;
}