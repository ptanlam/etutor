import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { coursesProvider } from '../courses';
import { CheckStudentAttendanceHandler } from './commands/check-student-attendance';
import { CreateNewSessionHandler } from './commands/create-new-session';
import { DelaySessionHandler } from './commands/delay-session';
import { UpdateSessionNotesHandler } from './commands/update-session-notes';
import { SessionsGrpcService } from './grpc';
import { CalculateTotalHoursForSessionsHandler } from './queries/calculate-total-hours-for-sessions';
import { CheckOverlappingSessionHandler } from './queries/check-overlapping-session';
import { GetSessionByIdHandler } from './queries/get-session-by-id';
import { GetSessionsForTargetHandler } from './queries/get-sessions-for-target';
import { Session, SessionSchema } from './schemas';
import { SessionsController } from './sessions.controller';

const handlers = [
  GetSessionsForTargetHandler,
  GetSessionByIdHandler,
  CheckOverlappingSessionHandler,
  CalculateTotalHoursForSessionsHandler,

  CreateNewSessionHandler,
  UpdateSessionNotesHandler,
  CheckStudentAttendanceHandler,
  DelaySessionHandler,
];

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    MongooseModule.forFeatureAsync([
      {
        name: Session.name,
        useFactory: () => {
          const schema = SessionSchema;
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
  controllers: [SessionsController, SessionsGrpcService],
  providers: [...handlers, ...coursesProvider],
})
export class SessionsModule {}
