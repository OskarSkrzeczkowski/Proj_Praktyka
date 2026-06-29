import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from '../sessions/sessions.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SessionsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
