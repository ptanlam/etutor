import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../../schemas';
import { DelaySession } from './delay-session';

@CommandHandler(DelaySession)
export class DelaySessionHandler
  implements ICommandHandler<DelaySession, Session | null>
{
  constructor(
    @InjectModel(Session.name) private readonly _sessionModel: Model<Session>,
  ) {}

  async execute(command: DelaySession): Promise<Session | null> {
    const { from, to, session } = command;

    const newSession = await new this._sessionModel({
      from,
      to,
      courseId: session.courseId,
    }).save();

    await session.updateOne(
      { delayTo: newSession.id },
      { returnOriginal: false },
    );
    return session;
  }
}
