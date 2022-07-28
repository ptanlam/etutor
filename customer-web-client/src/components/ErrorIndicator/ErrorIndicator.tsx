import { Box, Text } from '@mantine/core';
import React from 'react';
import { MdOutlineError } from 'react-icons/md';
import styles from './ErrorIndicator.module.css';

export function ErrorIndicator() {
  return (
    <Box className={styles.container}>
      <MdOutlineError className={styles.icon} />
      <Text>Something went wrong</Text>
    </Box>
  );
}
