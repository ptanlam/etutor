import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AnonymousRoute } from '../../components/AnonymousRoute';
import { BarsLoader } from '../../components/BarsLoader';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { UserRegistrationManagement } from './pages/UserRegistrationManagement';

const UserProfileManagement = React.lazy(() =>
  import('./pages/UserProfileManagement').then(({ UserProfileManagement }) => ({
    default: UserProfileManagement,
  })),
);

export function UserRoutes() {
  return (
    <Routes>
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Suspense fallback={<BarsLoader />}>
              <UserProfileManagement />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="registration-form"
        element={
          <AnonymousRoute>
            <UserRegistrationManagement />
          </AnonymousRoute>
        }
      />
    </Routes>
  );
}
