import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from '../../schemas';
import { GetSessionById } from './get-session-by-id';

@CommandHandler(GetSessionById)
export class GetSessionByIdHandler
  implements ICommandHandler<GetSessionById, Session | null>
{
  constructor(
    @InjectModel(Session.name) private readonly _sessionModel: Model<Session>,
  ) {}

  execute(command: GetSessionById): Promise<SessionDocument | null> {
    const { id } = command;
    return this._sessionModel.findById(id).exec();
  }
}
