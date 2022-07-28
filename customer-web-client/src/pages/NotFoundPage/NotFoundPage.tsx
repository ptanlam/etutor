import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

import { Box, Text, Title } from '@mantine/core';

import { useAppDocumentTitle } from '../../hooks';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  useAppDocumentTitle('Not Found');

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <GiMagnifyingGlass className={styles.icon} />
        <Title order={2}>Page cannot be found 🤯</Title>
      </Box>

      <NavLink to="/" className={styles.link}>
        <AiFillHome />
        <Text>Back to home</Text>
      </NavLink>
    </Box>
  );
}
