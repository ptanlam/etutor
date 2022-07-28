import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import { Box, Text, Title } from '@mantine/core';

import styles from './ErrorPage.module.css';

export function ErrorPage() {
  return (
    <Box className={styles.container}>
      <BiError className={styles.icon} />

      <Box>
        <Title className={styles.text}>error</Title>
        <NavLink to="/" className={styles.link}>
          <AiFillHome />
          <Text>Back to home</Text>
        </NavLink>
      </Box>
    </Box>
  );
}
