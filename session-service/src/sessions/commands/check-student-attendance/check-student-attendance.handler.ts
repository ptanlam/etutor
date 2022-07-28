import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from '../../schemas';
import { CheckStudentAttendance } from './check-student-attendance';

@CommandHandler(CheckStudentAttendance)
export class CheckStudentAttendanceHandler
  implements ICommandHandler<CheckStudentAttendance, Session | null>
{
  constructor(
    @InjectModel(Session.name) private readonly _sessionModel: Model<Session>,
  ) {}

  execute(command: CheckStudentAttendance): Promise<Session | null> {
    const { id } = command;
    return this._sessionModel
      .findByIdAndUpdate(
        id,
        { studentIsAttended: true },
        { returnOriginal: false },
      )
      .exec();
  }
}
