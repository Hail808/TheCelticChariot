// src/products/dto/update-inventory.dto.ts
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateInventoryDto {
  @ApiProperty({ example: 10, description: 'Quantity to add (positive) or subtract (negative)' })
  @IsInt()
  @Type(() => Number)
  quantity: number;
}