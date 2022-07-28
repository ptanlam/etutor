import { useAuth0 } from '@auth0/auth0-react';
import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function AnonymousRoute({ children }: PropsWithChildren<{}>) {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) return <Navigate to="/" replace state={{ location }} />;

  return <>{children}</>;
}
