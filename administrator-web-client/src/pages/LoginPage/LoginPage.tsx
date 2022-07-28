import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

export function LoginPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate('/callback');
  }, [isAuthenticated, navigate]);

  const onLoginClick = () => {
    loginWithRedirect({
      redirectUri: `${window.location.origin}/callback`,
    });
  };

  return (
    <Box
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={4}
    >
      <Heading
        letterSpacing={-2}
        fontWeight={900}
        bgClip="text"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        size="2xl"
      >
        e-tutor
      </Heading>

      <Text fontWeight={500} color="gray.500">
        This site is for e-tutor administrators only.
      </Text>

      <Button
        rounded="full"
        width="200px"
        colorScheme="pink"
        onClick={onLoginClick}
      >
        Login
      </Button>
    </Box>
  );
}
