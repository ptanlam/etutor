import React, { PropsWithChildren } from 'react';

import { Box } from '@mantine/core';

import { Header } from '../Header';
import styles from './BaseLayout.module.css';

export function BaseLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Box className={styles.container}>
      <Header />
      <Box className={styles.content}>{children}</Box>
    </Box>
  );
}
