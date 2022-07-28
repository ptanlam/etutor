import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { ConstantsRoutes } from './features/constants';
import { CoursesRoutes } from './features/courses';
import { TutorsRoutes } from './features/tutors';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthorizationCallbackPage } from './pages/AuthorizationCallbackPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="login" />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="callback" element={<AuthorizationCallbackPage />} />

      <Route
        path="dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="constants/*" element={<ConstantsRoutes />} />
        <Route path="tutors/*" element={<TutorsRoutes />} />
        <Route path="courses/*" element={<CoursesRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
