import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database';
import { FeedbacksModule } from './feedbacks';

@Module({
  imports: [
    FeedbacksModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),

        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_URI: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),

        IDENTITIES_SERVICE: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
