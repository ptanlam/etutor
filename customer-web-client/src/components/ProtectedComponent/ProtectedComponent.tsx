import React, { PropsWithChildren } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Tooltip } from '@mantine/core';

type Props = { disabledComponent?: React.ReactChild };

export function ProtectedComponent({
  disabledComponent: prompt,
  children,
}: PropsWithChildren<Props>) {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <Tooltip label="Please login">{prompt}</Tooltip>;
  }

  return <>{children}</>;
}
