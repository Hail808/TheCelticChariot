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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../src/generated/prisma");
let PrismaService = PrismaService_1 = class PrismaService extends prisma_1.PrismaClient {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'error' },
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'warn' },
            ],
            errorFormat: 'pretty',
        });
        this.logger = new common_1.Logger(PrismaService_1.name);
        if (process.env.NODE_ENV === 'development') {
            this.$on('query', (e) => {
                this.logger.debug(`Query: ${e.query}`);
                this.logger.debug(`Duration: ${e.duration}ms`);
            });
        }
        this.$on('error', (e) => {
            this.logger.error(e.message);
        });
    }
    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Successfully connected to database');
        }
        catch (error) {
            this.logger.error('Failed to connect to database', error);
            throw error;
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Disconnected from database');
    }
    async executeTransaction(fn) {
        try {
            return await this.$transaction(fn);
        }
        catch (error) {
            this.logger.error('Transaction failed', error);
            throw error;
        }
    }
    handlePrismaError(error) {
        if (error instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002':
                    return {
                        statusCode: 409,
                        message: 'A record with this unique field already exists',
                        field: error.meta?.target,
                    };
                case 'P2025':
                    return {
                        statusCode: 404,
                        message: 'Record not found',
                    };
                case 'P2003':
                    return {
                        statusCode: 400,
                        message: 'Foreign key constraint failed',
                        field: error.meta?.field_name,
                    };
                case 'P2000':
                    return {
                        statusCode: 400,
                        message: 'The provided value is too long for the column',
                        field: error.meta?.column_name,
                    };
                default:
                    return {
                        statusCode: 400,
                        message: error.message,
                    };
            }
        }
        if (error instanceof prisma_1.Prisma.PrismaClientValidationError) {
            return {
                statusCode: 400,
                message: 'Validation error',
                details: error.message,
            };
        }
        return {
            statusCode: 500,
            message: 'Internal server error',
        };
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Cannot clean database in production');
        }
        await this.order_item.deleteMany();
        await this.reviews.deleteMany();
        await this.shipping.deleteMany();
        await this.payment.deleteMany();
        await this.invoice.deleteMany();
        await this.orders.deleteMany();
        await this.customer.deleteMany();
        await this.guest.deleteMany();
        await this.product.deleteMany();
        await this.category.deleteMany();
        await this.address.deleteMany();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map