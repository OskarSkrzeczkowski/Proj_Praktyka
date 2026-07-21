import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SessionsService {
    constructor(private readonly prisma: PrismaService) {}

async create(dto: CreateSessionDto) {
    try {
            return await this.prisma.session.create({ data: dto });
        }catch (error) {
      
            throw new InternalServerErrorException('Sesja nie została zapisana.');
        }
    }

    async findByGameType(gameType: string, limit = 50) {
        return this.prisma.session.findMany({
            where: { gameType },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }

    async deleteByGameType(gameType: string) {
        return this.prisma.session.deleteMany({ where: { gameType } });
    }
}