import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateSessionDto {
    @IsString()
    @IsIn(['stroop', 'reaction', 'nback'])
    gameType!: string;

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