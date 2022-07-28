import { useState } from 'react';

export function useImageUploading() {
  const [image, setImage] = useState<string | null>(null);

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result || typeof reader.result !== 'string') return;
      setImage(reader.result);
    };
  };

  return { image, uploadImage };
}
