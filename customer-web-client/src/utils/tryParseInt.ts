export function tryParseInt(input: string) {
  const parsedNumber = parseInt(input);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
}
