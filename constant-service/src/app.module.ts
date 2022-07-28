import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AcademicRanksModule } from './academic-ranks';
import { AuthzModule } from './authz';
import { CurrenciesModule } from './currencies';
import { DatabaseModule } from './database';
import { EducationalGradesModule } from './educational-grades';
import { EducationalLevelsModule } from './educational-levels';
import { GendersModule } from './genders';
import { ConstantsGrpcModule } from './grpc';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASS: Joi.string().required(),
        DATABASE_URI: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),

        IDENTITY_PROVIDER_AUTHORITY: Joi.string().required(),
        IDENTITY_PROVIDER_AUDIENCE: Joi.string().required(),
      }),
    }),

    DatabaseModule,
    GendersModule,
    AcademicRanksModule,
    EducationalLevelsModule,
    EducationalGradesModule,
    ConstantsGrpcModule,
    AuthzModule,
    CurrenciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
