export function populateFormDataForDto<T>(dto: T) {
  const formData = new FormData();

  Object.entries(dto).forEach(([key, value]) => {
    if (value instanceof FileList) {
      Array.from(value).forEach((file) => formData.append(key, file));
    }

    if (value instanceof Date) formData.append(key, value.toLocaleString());

    if (typeof value === 'number') formData.append(key, `${value}`);
    if (typeof value === 'string') formData.append(key, value);
  });

  return formData;
}
