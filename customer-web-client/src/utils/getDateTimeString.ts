import { getTimeFromDate } from './getTimeFromDate';

export function getDateTimeString(dateString: string) {
  const date = new Date(dateString);

  return `${getTimeFromDate(date)}, ${date.toLocaleDateString()}`;
}
