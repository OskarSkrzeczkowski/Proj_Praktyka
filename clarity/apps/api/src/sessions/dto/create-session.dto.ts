import { IsString, IsNumber, IsOptional } from 'class-validator';
import type { CreateSessionPayload } from '@clarity/types';
import { IsEnum } from 'class-validator';
import { GameType } from '@clarity/types';

export class CreateSessionDto implements CreateSessionPayload {
    @IsString()
    @IsEnum(GameType)
    gameType!: GameType;

    @IsNumber()
    duration!: number;

    @IsNumber()
    @IsOptional()
    score?: number;

    @IsNumber()
    @IsOptional()
    efficiency?: number;

    @IsNumber()
    @IsOptional()
    avgReactionTime?: number;

    @IsNumber()
    @IsOptional()
    interference?: number;

    @IsNumber()
    @IsOptional()
    nLevel?: number;

    @IsNumber()
    @IsOptional()
    bestStreak?: number;
}