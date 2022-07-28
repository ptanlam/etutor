import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { TutorListPage } from './pages/TutorListPage';

export function TutorsRoutes() {
  return (
    <Routes>
      <Route path="active" element={<TutorListPage isActive />} />
      <Route path="pending" element={<TutorListPage isActive={false} />} />
    </Routes>
  );
}
