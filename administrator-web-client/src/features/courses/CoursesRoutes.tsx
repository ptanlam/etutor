import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { CourseListPage } from './pages/CourseListPage';

export function CoursesRoutes() {
  return (
    <Routes>
      <Route path="approved" element={<CourseListPage isActive />} />
      <Route path="pending" element={<CourseListPage isActive={false} />} />
    </Routes>
  );
}
