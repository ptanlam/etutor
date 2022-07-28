import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { identitiesProvider } from '../identities';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { Feedback, FeedbackSchema } from './schemas';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeatureAsync([
      {
        name: Feedback.name,
        useFactory: () => {
          const schema = FeedbackSchema;
          schema.set('toJSON', {
            transform: (_, result) => {
              const { _id, ...rest } = result;
              return { ...rest, id: _id };
            },
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, ...identitiesProvider],
})
export class FeedbacksModule {}
