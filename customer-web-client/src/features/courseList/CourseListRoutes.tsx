import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CourseDetailsManagement } from './pages/CourseDetailsManagement';
import { CourseListManagement } from './pages/CourseListManagement';
import { CourseListSearchingManagement } from './pages/CourseListSearchingManagement';

export function CourseListRoutes() {
  return (
    <Routes>
      <Route path="" element={<CourseListManagement />} />
      <Route
        path="searching-form"
        element={<CourseListSearchingManagement />}
      />
      <Route path=":id" element={<CourseDetailsManagement />} />
    </Routes>
  );
}
