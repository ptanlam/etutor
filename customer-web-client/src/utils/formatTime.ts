export function formatTime(input: number) {
  const numberString = input.toLocaleString();
  return numberString.length === 1 ? `0${numberString}` : numberString;
}
