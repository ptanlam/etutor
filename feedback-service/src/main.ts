import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ exposedHeaders: ['x-pagination'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT') || 3000);

  const logger = new Logger('Application');
  logger.log(`Service is running on ${await app.getUrl()}`);
}
bootstrap();
