import * as moment from 'moment';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { tryConvertToWeekday } from '../../../helpers';
import { CalculateTotalHoursForSessions } from './calculate-total-hours-for-sessions';

@CommandHandler(CalculateTotalHoursForSessions)
export class CalculateTotalHoursForSessionsHandler
  implements ICommandHandler<CalculateTotalHoursForSessions, number>
{
  execute(command: CalculateTotalHoursForSessions): Promise<number> {
    const { startDate, endDate, startAt, endAt, learningDays } = command;

    const [startAtHour, startAtMinute] = startAt.split(':');
    const [endAtHour, endAtMinute] = endAt.split(':');

    const totalHourPerSession =
      parseInt(endAtHour) +
      parseInt(endAtMinute) / 60 -
      (parseInt(startAtHour) + parseInt(startAtMinute) / 60);

    const numberOfDays = this.calculateTotalDays(
      startDate,
      endDate,
      learningDays.split(','),
    );

    return Promise.resolve(totalHourPerSession * numberOfDays);
  }

  private calculateTotalDays(
    startDate: Date,
    endDate: Date,
    learningDays: string[],
  ): number {
    const start = moment(startDate);
    const end = moment(endDate);

    const endOfFirstWeek = start.clone().endOf('week');
    const startOfLastWeek = end.clone().startOf('week');

    let numberOfDays =
      (startOfLastWeek.diff(endOfFirstWeek, 'days') * learningDays.length) / 7;

    const startWeekday = start.clone().weekday();
    const endWeekday = end.clone().weekday();

    let numberOfDaysOfFirstWeek = 0;
    let numberOfDaysOfLastWeek = 0;

    learningDays.forEach((day) => {
      const weekday = tryConvertToWeekday(day.trim());
      if (startWeekday > weekday && endWeekday < weekday) return;

      if (startWeekday < weekday) numberOfDaysOfFirstWeek++;
      if (endWeekday > weekday) numberOfDaysOfLastWeek++;
    });

    return numberOfDaysOfFirstWeek + numberOfDays + numberOfDaysOfLastWeek;
  }
}
