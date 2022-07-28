import React, { useEffect, useState } from 'react';

import { Image, ImageProps } from '@mantine/core';

type Props = { fileList?: FileList } & ImageProps;

export function CustomImage({ fileList, ...rest }: Props) {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (!fileList) return;

    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (!reader.result || typeof reader.result !== 'string') return;
      setImage(reader.result);
    };
  }, [fileList]);

  return <Image src={image} {...rest} />;
}
