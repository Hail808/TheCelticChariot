import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../src/generated/prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    executeTransaction<T>(fn: (prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>) => Promise<T>): Promise<T>;
    handlePrismaError(error: any): {
        statusCode: number;
        message: string;
        field: unknown;
        details?: undefined;
    } | {
        statusCode: number;
        message: string;
        field?: undefined;
        details?: undefined;
    } | {
        statusCode: number;
        message: string;
        details: string;
        field?: undefined;
    };
    cleanDatabase(): Promise<void>;
}
