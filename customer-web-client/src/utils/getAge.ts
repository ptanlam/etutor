export function getAge(dateOfBirth: string) {
  if (!dateOfBirth) return 'N/A';

  try {
    return (
      new Date().getFullYear() - new Date(dateOfBirth).getFullYear()
    ).toLocaleString();
  } catch (error) {
    return 'N/A';
  }
}
