import React, { PropsWithChildren } from 'react';

import { Box, Spinner } from '@chakra-ui/react';

import { ErrorIndicator } from '../ErrorIndicator';

type Props<T> = {
  type: 'component' | 'section';
  loading: boolean;
  hasError: boolean;
  data: T;
};

export function Wrapper<T>({
  type,
  loading,
  hasError,
  children,
  data,
}: PropsWithChildren<Props<T>>) {
  const renderSpinner = () => {
    switch (type) {
      case 'component':
        return <Spinner />;

      case 'section':
        return (
          <Box
            h="100%"
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="lg" />
          </Box>
        );

      default:
        return <Spinner />;
    }
  };

  if (loading) return renderSpinner();
  if (!loading && !data && hasError) return <ErrorIndicator />;

  return <>{children}</>;
}
