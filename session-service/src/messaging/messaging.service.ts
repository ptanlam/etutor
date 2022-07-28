import * as moment from 'moment';
import { from, map, mergeMap } from 'rxjs';

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { WeekDay } from '../constants/enums';
import { tryConvertToWeekday } from '../helpers';
import { CreateNewSession } from '../sessions/commands/create-new-session';
import { Session } from '../sessions/schemas';
import { SessionBulkCreationDto, SessionBulkCreationMessage } from './messages';

@Injectable()
export class MessagingService {
  constructor(private readonly _commandBus: CommandBus) {}

  @RabbitSubscribe({
    exchange: 'session',
    queue: 'session-bulk-creation-queue',
    routingKey: 'session.command.bulk-create',
  })
  public createNewSessions({ message }: SessionBulkCreationMessage) {
    const {
      startDate: startDateInMilliseconds,
      endDate: endDateInMilliseconds,
      ...rest
    } = message;

    const startDate = moment(startDateInMilliseconds).utcOffset(0);
    const endDate = moment(endDateInMilliseconds).utcOffset(0);

    return this.createSessions(rest, startDate, endDate);
  }

  private createSessions(
    dto: Omit<SessionBulkCreationDto, 'startDate' | 'endDate'>,
    startDate: moment.Moment,
    endDate: moment.Moment,
  ) {
    const lastDateOfFirstWeek = startDate.clone().endOf('week').startOf('day');
    const firstDateOfLastWeek = endDate.clone().startOf('week').startOf('day');

    const learningDays = dto.learningDays.replace(' ', '').split(',');

    const numberOfWeeks = firstDateOfLastWeek.diff(
      lastDateOfFirstWeek,
      'weeks',
    );

    from([
      // first week
      this.getLearningDaysInWeek(startDate, lastDateOfFirstWeek, learningDays),

      // every weeks between
      this.getLearningDaysInWeeks(
        lastDateOfFirstWeek,
        numberOfWeeks,
        learningDays,
      ),

      // last week
      this.getLearningDaysInWeek(firstDateOfLastWeek, endDate, learningDays),
    ])
      .pipe(mergeMap((dates) => this.sendSessionCreationCommands(dates, dto)))
      .subscribe();
  }

  private sendSessionCreationCommands(
    learningDates: moment.Moment[],
    {
      startAt,
      endAt,
      ownerId,
      courseId,
      enrollmentId,
    }: Omit<SessionBulkCreationDto, 'startDate' | 'endDate' | 'learningDays'>,
  ) {
    return from(learningDates).pipe(
      map((learningDate) => ({
        start: this.getLearningTime(learningDate, startAt).toDate(),
        end: this.getLearningTime(learningDate, endAt).toDate(),
      })),
      mergeMap(({ start, end }) =>
        from(
          this._commandBus.execute<CreateNewSession, Session>(
            new CreateNewSession(ownerId, courseId, enrollmentId, start, end),
          ),
        ),
      ),
    );
  }

  private getLearningDaysInWeek(
    startDate: moment.Moment,
    endDate: moment.Moment,
    learningDays: string[],
  ) {
    const result: moment.Moment[] = [];

    const currentDate = startDate.clone().startOf('day');
    while (currentDate <= endDate) {
      const normalizedWeekday =
        WeekDay[currentDate.weekday()].toLocaleLowerCase();

      if (learningDays.includes(normalizedWeekday)) {
        result.push(currentDate.clone());
      }
      currentDate.add(1, 'day');
    }

    return result;
  }

  private getLearningDaysInWeeks(
    lastDateOfFirstWeek: moment.Moment,
    numberOfWeeks: number,
    learningDays: string[],
  ) {
    const result: moment.Moment[] = [];

    [...new Array(numberOfWeeks)].forEach((_, index) => {
      const lastDateOfCurrentWeek = lastDateOfFirstWeek
        .clone()
        .add(index, 'week');

      learningDays.forEach((day) => {
        const weekday = tryConvertToWeekday(day);
        result.push(lastDateOfCurrentWeek.clone().add(weekday + 1, 'days'));
      });
    });

    return result;
  }

  private getLearningTime(date: moment.Moment, time: string) {
    const learningDate = date.clone();
    const [hour, minute] = time.split(':');

    //* it means it is the next day
    if (parseInt(hour) === 0) learningDate.add(1, 'day');

    return learningDate.add(hour, 'hours').add(minute, 'minutes');
  }
}
