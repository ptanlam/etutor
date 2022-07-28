import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

export function ProtectedRoute({ children }: PropsWithChildren<{}>) {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <>{!isLoading && isAuthenticated ? children : <Navigate to="/login" />}</>
  );
}
