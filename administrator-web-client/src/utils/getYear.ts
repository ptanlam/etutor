export function getYear(date: string) {
  try {
    return new Date(date).getFullYear();
  } catch (error) {
    return null;
  }
}
