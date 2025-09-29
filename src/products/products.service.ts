// src/products/products.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Prisma } from '../../src/generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: {
          product_name: createProductDto.product_name,
          description: createProductDto.description,
          price: new Prisma.Decimal(createProductDto.price),
          inventory: createProductDto.inventory,
          prod_image_url: createProductDto.prod_image_url,
          fk_category_id: createProductDto.category_id,
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      const prismaError = this.prisma.handlePrismaError(error);
      throw new BadRequestException(prismaError.message);
    }
  }

  async findAll(filterDto: FilterProductDto) {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      category_id, 
      min_price, 
      max_price,
      sort_by = 'product_id',
      sort_order = 'desc'
    } = filterDto;
    
    const skip = (page - 1) * limit;
    
    const where: Prisma.productWhereInput = {
      ...(category_id && { fk_category_id: category_id }),
      ...(search && {
        OR: [
          { product_name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(min_price !== undefined || max_price !== undefined
        ? {
            price: {
              ...(min_price !== undefined && { gte: new Prisma.Decimal(min_price) }),
              ...(max_price !== undefined && { lte: new Prisma.Decimal(max_price) }),
            },
          }
        : {}),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sort_by]: sort_order },
        include: {
          category: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { product_id: id },
      include: {
        category: true,
        reviews: {
          include: {
            customer: {
              select: {
                customer_id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async findByCategory(categoryId: number) {
    return await this.prisma.product.findMany({
      where: { fk_category_id: categoryId },
      include: {
        category: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // Check if exists

    try {
      return await this.prisma.product.update({
        where: { product_id: id },
        data: {
          ...(updateProductDto.product_name && { product_name: updateProductDto.product_name }),
          ...(updateProductDto.description !== undefined && { description: updateProductDto.description }),
          ...(updateProductDto.price && { price: new Prisma.Decimal(updateProductDto.price) }),
          ...(updateProductDto.inventory !== undefined && { inventory: updateProductDto.inventory }),
          ...(updateProductDto.prod_image_url !== undefined && { prod_image_url: updateProductDto.prod_image_url }),
          ...(updateProductDto.category_id && { fk_category_id: updateProductDto.category_id }),
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      const prismaError = this.prisma.handlePrismaError(error);
      throw new BadRequestException(prismaError.message);
    }
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    try {
      return await this.prisma.product.delete({
        where: { product_id: id },
      });
    } catch (error) {
      const prismaError = this.prisma.handlePrismaError(error);
      throw new BadRequestException(prismaError.message);
    }
  }

  async updateInventory(id: number, quantity: number) {
    const product = await this.findOne(id);

    if (product.inventory + quantity < 0) {
      throw new BadRequestException('Insufficient inventory');
    }

    return await this.prisma.product.update({
      where: { product_id: id },
      data: {
        inventory: {
          increment: quantity,
        },
      },
    });
  }

  async checkInventory(id: number, quantity: number): Promise<boolean> {
    const product = await this.findOne(id);
    return product.inventory >= quantity;
  }

  async getProductsByPriceRange(minPrice: number, maxPrice: number) {
    return await this.prisma.product.findMany({
      where: {
        price: {
          gte: new Prisma.Decimal(minPrice),
          lte: new Prisma.Decimal(maxPrice),
        },
      },
      include: {
        category: true,
      },
    });
  }

  async getLowInventoryProducts(threshold: number = 5) {
    return await this.prisma.product.findMany({
      where: {
        inventory: {
          lte: threshold,
        },
      },
      include: {
        category: true,
      },
    });
  }
}