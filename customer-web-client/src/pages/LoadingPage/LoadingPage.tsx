import { Box } from '@mantine/core';
import React from 'react';
import { DotsWave } from '../../components/DotsWave';
import styles from './Loading.module.css';

export function LoadingPage() {
  return (
    <Box className={styles.container}>
      <DotsWave />
    </Box>
  );
}
