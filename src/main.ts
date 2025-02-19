import { config } from 'dotenv';
import { join } from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'local'}`;
config({ path: join(__dirname, '..', envFile) });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || [];
  app.use(helmet());

  app.enableCors({
    origin: allowedOrigins.length ? allowedOrigins : false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
}

bootstrap();
