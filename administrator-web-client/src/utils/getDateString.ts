import { getDayInNumber } from './getDayInNumber';
import { getMonthInText } from './getMonthInText';
import { getYear } from './getYear';

export function getDateString(date: string) {
  if (!date) return 'N/A';
  return `${getDayInNumber(date)}, ${getMonthInText(date)} ${getYear(date)}`;
}
