// src/prisma/prisma.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '../../src/generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

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

    // Log queries in development
    if (process.env.NODE_ENV === 'development') {
      this.$on('query' as never, (e: Prisma.QueryEvent) => {
        this.logger.debug(`Query: ${e.query}`);
        this.logger.debug(`Duration: ${e.duration}ms`);
      });
    }

    // Log errors
    this.$on('error' as never, (e: Prisma.LogEvent) => {
      this.logger.error(e.message);
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from database');
  }

  // Helper method for transaction handling
  async executeTransaction<T>(
    fn: (prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => Promise<T>,
  ): Promise<T> {
    try {
      return await this.$transaction(fn);
    } catch (error) {
      this.logger.error('Transaction failed', error);
      throw error;
    }
  }

  // Helper method to handle Prisma errors
  handlePrismaError(error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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

    if (error instanceof Prisma.PrismaClientValidationError) {
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

  // Cleanup helper for testing
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    // Clean tables in correct order due to foreign keys
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
}