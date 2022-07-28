import React from 'react';

import { Box, Spinner } from '@chakra-ui/react';

export function LoadingPage() {
  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Box>
  );
}
