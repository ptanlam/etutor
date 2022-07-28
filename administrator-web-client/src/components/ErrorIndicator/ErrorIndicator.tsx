import React from 'react';
import { TiWarning } from 'react-icons/ti';

import { Box, Icon, Text } from '@chakra-ui/react';

export function ErrorIndicator() {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Icon as={TiWarning} />
      <Text>Something wrong happened!</Text>
    </Box>
  );
}
