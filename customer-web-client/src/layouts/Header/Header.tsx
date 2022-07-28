import React from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Container } from '@mantine/core';

import { navItems } from '../../constants/layouts/Headers';
import { AuthSection } from '../AuthSection';
import styles from './Header.module.css';

export function Header() {
  return (
    <>
      <AuthSection />

      <Box className={styles.container}>
        <Container size="xl" className={styles.content}>
          <NavLink to="/" className={styles.logo}>
            e-tutor
          </NavLink>

          <Box className={styles.navigation}>
            {React.Children.toArray(
              navItems.map(({ name, path }) => (
                <NavLink
                  to={path}
                  className={styles.navigationText}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--blue-800)' : 'var(--gray-400)',
                  })}
                >
                  {name}
                </NavLink>
              )),
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
