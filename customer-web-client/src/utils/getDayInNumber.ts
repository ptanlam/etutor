export function getDayInNumber(date: string) {
  try {
    return new Date(date).getDate();
  } catch (error) {
    return null;
  }
}
