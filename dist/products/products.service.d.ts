import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Prisma } from '../../src/generated/prisma';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        category: {
            description: string | null;
            name: string;
            category_id: number;
        };
    } & {
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    }>;
    findAll(filterDto: FilterProductDto): Promise<{
        data: ({
            category: {
                name: string;
                category_id: number;
            };
        } & {
            product_id: number;
            product_name: string;
            description: string | null;
            price: Prisma.Decimal;
            inventory: number;
            prod_image_url: string | null;
            fk_category_id: number | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        category: {
            name: string;
            category_id: number;
        };
        reviews: ({
            customer: {
                customer_id: number;
                first_name: string;
                last_name: string;
            };
        } & {
            review_id: number;
            review_text: string | null;
            review_date: Date;
            rating: number;
            fk_customer_id: number | null;
            fk_product_id: number | null;
        })[];
    } & {
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    }>;
    findByCategory(categoryId: number): Promise<({
        category: {
            description: string | null;
            name: string;
            category_id: number;
        };
    } & {
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    })[]>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        category: {
            description: string | null;
            name: string;
            category_id: number;
        };
    } & {
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    }>;
    remove(id: number): Promise<{
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    }>;
    updateInventory(id: number, quantity: number): Promise<{
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    }>;
    checkInventory(id: number, quantity: number): Promise<boolean>;
    getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<({
        category: {
            description: string | null;
            name: string;
            category_id: number;
        };
    } & {
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    })[]>;
    getLowInventoryProducts(threshold?: number): Promise<({
        category: {
            description: string | null;
            name: string;
            category_id: number;
        };
    } & {
        product_id: number;
        product_name: string;
        description: string | null;
        price: Prisma.Decimal;
        inventory: number;
        prod_image_url: string | null;
        fk_category_id: number | null;
    })[]>;
}
