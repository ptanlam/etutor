import * as Joi from 'joi';

import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MessagingModule } from './messaging/';
import { NotificationsModule } from './notifications';
import smtpConfig from './smtp.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        SMTP_URI: Joi.string().required(),
        PORT: Joi.number().greater(2999),
      }),
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule.forFeature(smtpConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: configService.get('smtp.uri'),
        defaults: {
          from: '"No Reply" <noreply@etutor.com>',
        },
      }),
    }),

    NotificationsModule,
    MessagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
