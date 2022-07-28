import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database';
import { MessagingModule } from './messaging';
import { SessionsModule } from './sessions';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        GRPC_CONNECTION_URL: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_URI: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        COURSES_SERVICE: Joi.string().required(),
      }),
    }),
    SessionsModule,
    DatabaseModule,
    MessagingModule,
  ],
})
export class AppModule {}
