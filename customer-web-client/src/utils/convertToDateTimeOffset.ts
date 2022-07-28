import moment from 'moment';

import { dateTimeOffsetFormat } from '../constants/shared';

export function convertToDateTimeOffset(date: Date, time: string) {
  return moment(`${date.toLocaleDateString()} ${time}`).format(
    dateTimeOffsetFormat
  );
}
