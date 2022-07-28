import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../../schemas';
import { UpdateSessionNotes } from './update-session-notes';

@CommandHandler(UpdateSessionNotes)
export class UpdateSessionNotesHandler
  implements ICommandHandler<UpdateSessionNotes, Session | null>
{
  constructor(
    @InjectModel(Session.name) private readonly _sessionModel: Model<Session>,
  ) {}

  execute(command: UpdateSessionNotes): Promise<Session | null> {
    const { id, notes } = command;
    return this._sessionModel.findByIdAndUpdate(id, { notes }).exec();
  }
}
