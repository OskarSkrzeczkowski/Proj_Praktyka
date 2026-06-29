import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    create(@Body() dto: CreateSessionDto) {
        return this.sessionsService.create(dto);
    }

    @Get(':gameType')
    findAll(@Param('gameType') gameType: string) {
        return this.sessionsService.findByGameType(gameType);
    }

    @Delete(':gameType')
    remove(@Param('gameType') gameType: string) {
        return this.sessionsService.deleteByGameType(gameType);
    }
}