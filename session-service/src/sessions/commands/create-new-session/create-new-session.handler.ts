import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../../schemas';
import { CreateNewSession } from './create-new-session';

@CommandHandler(CreateNewSession)
export class CreateNewSessionHandler
  implements ICommandHandler<CreateNewSession, Session>
{
  constructor(
    @InjectModel(Session.name) private readonly _sessionModel: Model<Session>,
  ) {}

  execute(command: CreateNewSession): Promise<Session> {
    const { courseId, from, to, ownerId, enrollmentId } = command;

    const session = new this._sessionModel({
      courseId,
      ownerId,
      enrollmentId,
      from,
      to,
      studentIsAttended: false,
      isFinished: false,
    });

    return session.save();
  }
}
