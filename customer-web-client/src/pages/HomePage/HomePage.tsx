import { Box, Container, Text, Title } from '@mantine/core';

import background from '../../assets/images/pages/Home/background1.jpg';
import { useAppDocumentTitle } from '../../hooks';
import styles from './HomePage.module.css';

export function HomePage() {
  useAppDocumentTitle('Home');

  return (
    <Box
      style={{ backgroundImage: `url('${background}')` }}
      className={styles.container}
    >
      <Container
        size="xl"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '64px 0',
          flexDirection: 'column',
        }}
      >
        <Title style={{ fontWeight: 900, fontSize: '2.4rem' }}>
          Welcome to eTutor
        </Title>
        <Text>The online tutoring</Text>
        <Text>and online course site for everyone.</Text>
      </Container>
    </Box>
  );
}
