export function convertToTitleCase(input: string) {
  const sections = input.split(' ');
  const convertedSections = sections.map(
    (section) =>
      `${section.at(0)?.toLocaleUpperCase()}${section
        .slice(1)
        .toLocaleLowerCase()}`
  );

  return convertedSections.join(' ');
}
