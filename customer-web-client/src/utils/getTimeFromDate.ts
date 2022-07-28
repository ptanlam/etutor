import { formatTime } from './formatTime';

export function getTimeFromDate(date: Date) {
  return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
}
