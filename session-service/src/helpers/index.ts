import { WeekDay } from '../constants/enums';
import 'moment-timezone';
import * as moment from 'moment';
import { from, map } from 'rxjs';

export const FORMAT = 'MM/DD/YYYY';

export function tryConvertToWeekday(weekday: string) {
  try {
    return WeekDay[weekday.toUpperCase().trim() as keyof typeof WeekDay];
  } catch (error) {
    return -1;
  }
}

export function getLearningDays(learningDays: string, startDateString: string) {
  const startDate = moment(startDateString, FORMAT);
  const startWeekDay = startDate.weekday();

  return from(learningDays.split(',')).pipe(
    map((learningDay) => learningDay.trim().toLocaleLowerCase()),
    map((learningDay) => tryConvertToWeekday(learningDay)),
    map((currentWeekDay) => {
      const gap = currentWeekDay - startWeekDay;
      const currentDate = startDate.clone();
      return { currentDate, gap };
    }),
  );
}

/**
 *
 * @param currentDate the starting date
 * @param time time to start in format HH:mm
 * @param numberOfDays number of next days to calculate
 *
 * @returns the calculated date and time
 */
export function getDateTimeAfterDays(
  currentDate: moment.Moment,
  time: string,
  numberOfDays: number,
  timezone: string,
): string {
  const [hour, minute] = time.split(':');

  const date = currentDate
    .clone()
    .add(numberOfDays, 'days')
    .hour(parseInt(hour))
    .minute(parseInt(minute));

  return date.parseZone().tz(timezone, true).toISOString(true);
}
