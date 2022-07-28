import { join } from 'path';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'constants',
      protoPath: join(__dirname, 'grpc/constants.proto'),
      url: configService.get<string>('GRPC_CONNECTION_URL'),
    },
  });

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

  app.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT') || 3000);

  const logger = new Logger('Application');
  logger.log(`Service is running on ${await app.getUrl()}`);
}
bootstrap();
