import { colorSchemes } from '../constants/shared';

export function getRandomColorScheme() {
  return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
}
