import { Session } from '../models/session';
import { convertToDateTimeOffset } from '../utils';
import { BaseHttpClient } from './baseHttpClient';

export class SessionsService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getListForTarget(
    targetId: string,
    from: Date,
    to: Date,
    targetType: 'course' | 'owner',
    signal?: AbortSignal
  ) {
    return this._httpClient.callAPI<Session[]>({
      method: 'GET',
      url: 'sessions',
      params: { targetId, from, to, targetType },
      signal,
    });
  }

  getTotalHours(
    startDate: Date,
    endDate: Date,
    startAt: string,
    endAt: string,
    learningDays: string[]
  ) {
    return this._httpClient.callAPI<number>({
      method: 'GET',
      url: 'sessions/hours',
      params: {
        startDate: convertToDateTimeOffset(startDate, startAt),
        endDate: convertToDateTimeOffset(endDate, endAt),
        startAt,
        endAt,
        learningDays,
      },
    });
  }

  checkOverlapping(
    startDate: Date,
    endDate: Date,
    startAt: string,
    endAt: string,
    learningDays: string[],
    timezoneOffset: number,
    ownerId: string
  ) {
    const [startAtHour, startAtMinute] = startAt.split(':');
    const [endAtHour, endAtMinute] = endAt.split(':');

    const startAtHourUTC = parseInt(startAtHour) - Math.trunc(timezoneOffset);
    const startAtMinuteUTC = parseInt(startAtMinute) - (timezoneOffset % 1);
    const endAtHourUTC = parseInt(endAtHour) - Math.trunc(timezoneOffset);
    const endAtMinuteUTC = parseInt(endAtMinute) - (timezoneOffset % 1);

    return this._httpClient.callAPI<boolean>({
      url: 'sessions/check-overlapping',
      params: {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        startAt: `${startAtHourUTC}:${startAtMinuteUTC}`,
        endAt: `${endAtHourUTC}:${endAtMinuteUTC}`,
        learningDays: learningDays.join(','),
        ownerId,
      },
    });
  }
}
