import { useDocumentTitle } from '@mantine/hooks';

export function useAppDocumentTitle(section: string) {
  useDocumentTitle(`${section} | etutor`);
}
