import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import 'tsconfig-paths/register';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: 'http://localhost:4200' });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api');
    await app.listen(3333);
}
bootstrap();