import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { ApplicationRole } from '../../constants/models';
import { TutorDetailsManagement } from './pages/TutorDetailsManagement';
import { TutorListManagement } from './pages/TutorListManagement';
import { TutorListSearchingManagement } from './pages/TutorListSearchingManagement';
import { TutorRegistrationManagement } from './pages/TutorRegistrationManagement';

export function TutorListRoutes() {
  return (
    <Routes>
      <Route path="" element={<TutorListManagement />} />

      <Route path="searching-form" element={<TutorListSearchingManagement />} />

      <Route
        path="registration-form"
        element={
          <ProtectedRoute exceptedRole={ApplicationRole.Tutor}>
            <TutorRegistrationManagement />
          </ProtectedRoute>
        }
      />

      <Route path=":id" element={<TutorDetailsManagement />} />
    </Routes>
  );
}
