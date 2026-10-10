import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );

  app.enableCors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);

  Logger.log(
    `Book library server is up and ready to roll on port ${process.env.PORT ?? 3001}`,
  );
}

bootstrap();
