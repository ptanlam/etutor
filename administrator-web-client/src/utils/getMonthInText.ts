const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getMonthInText(date: string) {
  try {
    const month = new Date(date).getMonth();
    return MONTH[month];
  } catch (error) {
    return '';
  }
}
