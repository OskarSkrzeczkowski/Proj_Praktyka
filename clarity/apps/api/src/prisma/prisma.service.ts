import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Logger } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        const pool = new Pool({ 
        connectionString: process.env.DATABASE_URL 
        });
    
        const adapter = new PrismaPg(pool);
    
        super({ adapter });
    }

    private readonly logger = new Logger(PrismaService.name);
    async onModuleInit() {
        await this.$connect();
        this.logger.log('Połączono z bazą danych');
    }
}