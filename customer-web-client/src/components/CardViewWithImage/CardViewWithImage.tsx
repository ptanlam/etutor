import React, { CSSProperties, PropsWithChildren } from 'react';

import { Grid, Image } from '@mantine/core';

import { CustomImage } from '../CustomImage';
import styles from './CardViewWithImage.module.css';

type Props = { files?: FileList; imageString?: string; style?: CSSProperties };

export function CardViewWithImage({
  files,
  imageString,
  children,
  style,
}: PropsWithChildren<Props>): JSX.Element {
  const renderImage = () => {
    if (!!files) return <CustomImage fileList={files} />;
    return <Image src={imageString} />;
  };

  return (
    <Grid className={styles.container} style={style}>
      <Grid.Col span={3} style={{ display: 'flex', alignItems: 'center' }}>
        {renderImage()}
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
}
