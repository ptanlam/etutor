import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '../../components/ProtectedRoute';
import { ApplicationRole } from '../../constants/models';
import { StudentScheduleListManagement } from './pages/StudentScheduleListManagement';
import { StudentTransactionListManagement } from './pages/UserTransactionListManagement';

export function StudentRoutes() {
  return (
    <Routes>
      <Route
        path="schedules"
        element={
          <ProtectedRoute requiredRole={ApplicationRole.Student}>
            <StudentScheduleListManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="transactions"
        element={
          <ProtectedRoute requiredRole={ApplicationRole.Student}>
            <StudentTransactionListManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
