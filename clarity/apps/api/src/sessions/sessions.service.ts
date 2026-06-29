import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateSessionDto) {
        return this.prisma.session.create({ data: dto });
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