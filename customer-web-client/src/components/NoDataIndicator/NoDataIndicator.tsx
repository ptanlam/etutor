import React from 'react';
import { BsInboxes } from 'react-icons/bs';

import { Box, Text } from '@mantine/core';

import styles from './NoDataIndicator.module.css';

export function NoDataIndicator() {
  return (
    <Box className={styles.container}>
      <BsInboxes className={styles.icon} />
      <Text className={styles.text}>There is nothing to show</Text>
    </Box>
  );
}
