"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_1 = require("../../src/generated/prisma");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        try {
            return await this.prisma.product.create({
                data: {
                    product_name: createProductDto.product_name,
                    description: createProductDto.description,
                    price: new prisma_1.Prisma.Decimal(createProductDto.price),
                    inventory: createProductDto.inventory,
                    prod_image_url: createProductDto.prod_image_url,
                    fk_category_id: createProductDto.category_id,
                },
                include: {
                    category: true,
                },
            });
        }
        catch (error) {
            const prismaError = this.prisma.handlePrismaError(error);
            throw new common_1.BadRequestException(prismaError.message);
        }
    }
    async findAll(filterDto) {
        const { page = 1, limit = 20, search, category_id, min_price, max_price, sort_by = 'product_id', sort_order = 'desc' } = filterDto;
        const skip = (page - 1) * limit;
        const where = {
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
                        ...(min_price !== undefined && { gte: new prisma_1.Prisma.Decimal(min_price) }),
                        ...(max_price !== undefined && { lte: new prisma_1.Prisma.Decimal(max_price) }),
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async findByCategory(categoryId) {
        return await this.prisma.product.findMany({
            where: { fk_category_id: categoryId },
            include: {
                category: true,
            },
        });
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        try {
            return await this.prisma.product.update({
                where: { product_id: id },
                data: {
                    ...(updateProductDto.product_name && { product_name: updateProductDto.product_name }),
                    ...(updateProductDto.description !== undefined && { description: updateProductDto.description }),
                    ...(updateProductDto.price && { price: new prisma_1.Prisma.Decimal(updateProductDto.price) }),
                    ...(updateProductDto.inventory !== undefined && { inventory: updateProductDto.inventory }),
                    ...(updateProductDto.prod_image_url !== undefined && { prod_image_url: updateProductDto.prod_image_url }),
                    ...(updateProductDto.category_id && { fk_category_id: updateProductDto.category_id }),
                },
                include: {
                    category: true,
                },
            });
        }
        catch (error) {
            const prismaError = this.prisma.handlePrismaError(error);
            throw new common_1.BadRequestException(prismaError.message);
        }
    }
    async remove(id) {
        await this.findOne(id);
        try {
            return await this.prisma.product.delete({
                where: { product_id: id },
            });
        }
        catch (error) {
            const prismaError = this.prisma.handlePrismaError(error);
            throw new common_1.BadRequestException(prismaError.message);
        }
    }
    async updateInventory(id, quantity) {
        const product = await this.findOne(id);
        if (product.inventory + quantity < 0) {
            throw new common_1.BadRequestException('Insufficient inventory');
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
    async checkInventory(id, quantity) {
        const product = await this.findOne(id);
        return product.inventory >= quantity;
    }
    async getProductsByPriceRange(minPrice, maxPrice) {
        return await this.prisma.product.findMany({
            where: {
                price: {
                    gte: new prisma_1.Prisma.Decimal(minPrice),
                    lte: new prisma_1.Prisma.Decimal(maxPrice),
                },
            },
            include: {
                category: true,
            },
        });
    }
    async getLowInventoryProducts(threshold = 5) {
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
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map