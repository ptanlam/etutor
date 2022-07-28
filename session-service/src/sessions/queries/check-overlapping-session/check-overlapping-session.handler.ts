import * as moment from 'moment';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CheckOverlappingSession } from './check-overlapping-session';
import { tryConvertToWeekday } from '../../../helpers';
import { Session } from '../../schemas';
import { WeekDay } from '../../../constants/enums';

@CommandHandler(CheckOverlappingSession)
export class CheckOverlappingSessionHandler
  implements ICommandHandler<CheckOverlappingSession, boolean>
{
  constructor(
    @InjectModel(Session.name) private readonly _sessionModel: Model<Session>,
  ) {}

  async execute(command: CheckOverlappingSession): Promise<boolean> {
    const { startAt, endAt, ownerId } = command;

    const startDate = moment(command.startDate);
    const endDate = moment(command.endDate);

    const learningDays = command.learningDays
      .split(',')
      .map(tryConvertToWeekday)
      .sort();

    return await this.checkHavingSessionsInWeeks(
      startDate,
      endDate,
      learningDays,
      {
        startAt,
        endAt,
        ownerId,
      },
    );
  }

  private async checkHavingSessionsInWeeks(
    startDate: moment.Moment,
    endDate: moment.Moment,
    learningDays: WeekDay[],
    {
      startAt,
      endAt,
      ownerId,
    }: Pick<CheckOverlappingSession, 'startAt' | 'endAt' | 'ownerId'>,
  ) {
    if (!learningDays.length) return false;

    const startUtcDate = startDate.clone().utcOffset(0);
    const endUtcDate = endDate.clone().utcOffset(0);
    const currentDate = startUtcDate.clone().startOf('day');

    const [startAtHour, startAtMin] = startAt.split(':');
    const [endAtHour, endAtMin] = endAt.split(':');

    while (currentDate <= endUtcDate) {
      const hasSession = (
        await Promise.all(
          learningDays.map(async (day) => {
            const startLearningDate = currentDate
              .clone()
              .add(day - currentDate.weekday(), 'days')
              .add(startAtHour, 'hours')
              .add(startAtMin, 'minutes');

            if (startLearningDate < startDate) return;

            const endLearningDate = currentDate
              .clone()
              .add(day - currentDate.weekday(), 'days')
              .add(endAtHour, 'hours')
              .add(endAtMin, 'minutes')
              .toDate();

            const session = await this.getSession(
              startLearningDate.toDate(),
              endLearningDate,
              ownerId,
            );
            console.log(
              '🚀 ~ file: check-overlapping-session.handler.ts ~ line 88 ~ learningDays.map ~ session',
              session,
            );

            if (!!session) return session;
          }),
        )
      ).some((session) => !!session);

      if (hasSession) return true;
      currentDate.add(1, 'week');
    }

    return false;
  }

  private async getSession(from: Date, to: Date, ownerId: string) {
    // session-1: from-1 -> to-1
    // session-2: from-2 -> to-2
    return await this._sessionModel.findOne({
      $or: [
        // from-1 from-2 to-2 to-1
        { $and: [{ from: { $gte: from }, to: { $lte: to } }] },
        // from-2 from-1 to-1 to-2
        { $and: [{ from: { $lte: from }, to: { $gte: to } }] },
        // from-2 from-1 to-2 to-1
        {
          $and: [
            {
              $and: [{ from: { $gte: from } }, { from: { $lte: to } }],
              to: { $gte: to },
            },
          ],
        },
        // from-1 from-2 to-1 to-2
        {
          $and: [
            {
              from: { $lte: from },
              $and: [{ to: { $gte: from } }, { to: { $lte: to } }],
            },
          ],
        },
      ],
      ownerId,
    });
  }
}
