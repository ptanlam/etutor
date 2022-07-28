import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { ApplicationRole } from '../../constants/models';
import { userDetailsSelector } from '../../features/user/userSlice';
import { checkHavingRole } from '../../utils';

type Props = { requiredRole?: ApplicationRole; exceptedRole?: ApplicationRole };

export function ProtectedRoute({
  requiredRole,
  exceptedRole,
  children,
}: PropsWithChildren<Props>) {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();
  const { roles } = useSelector(userDetailsSelector);

  if (!isAuthenticated) return <Navigate to="/" replace state={{ location }} />;
  if (!requiredRole && !exceptedRole) return <>{children}</>;

  if (requiredRole && !checkHavingRole(roles, requiredRole))
    return <Navigate to="/" replace state={{ location }} />;

  if (exceptedRole && checkHavingRole(roles, exceptedRole))
    return <Navigate to="/" replace state={{ location }} />;

  return <>{children}</>;
}
