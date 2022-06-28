import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3030);
}
bootstrap();
