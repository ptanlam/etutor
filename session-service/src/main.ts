import { join } from 'path';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
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

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'sessions',
      protoPath: join(__dirname, 'sessions/sessions.proto'),
      url: configService.get<string>('GRPC_CONNECTION_URL'),
    },
  });

  app.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT') || 3000);

  const logger = new Logger('Application');
  logger.log(`Service is running on port ${await app.getUrl()}`);
}
bootstrap();
