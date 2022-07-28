import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { NotificationsService } from '../notifications';
import { PrismaService } from '../prisma.service';
import messagingConfig from './messaging.config';
import { MessagingService } from './messaging.service';

@Module({
  imports: [
    MessagingModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule.forFeature(messagingConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('rabbitmq.uri');
        if (!uri) throw new Error('rabbitmq uri is null or empty.');
        return {
          exchanges: [{ name: 'notification', type: 'direct' }],
          uri,
        };
      },
    }),
  ],
  providers: [MessagingService, NotificationsService, PrismaService],
})
export class MessagingModule {}
