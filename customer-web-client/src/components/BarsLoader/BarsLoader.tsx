import { LoadingOverlay, Loader } from '@mantine/core';
import React from 'react';

export function BarsLoader() {
  return (
    <LoadingOverlay
      visible={true}
      loader={<Loader variant="bars" size="md" color="black" />}
    />
  );
}
