import { useMemo } from 'react';

export function useTimezoneOffset() {
  const tzOffset = useMemo<number>(
    () => new Date().getTimezoneOffset() / -60,
    [],
  );
  return tzOffset;
}
