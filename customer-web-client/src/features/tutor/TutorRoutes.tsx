import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TutorCourseListManagement } from './pages/TutorCourseListManagement';
import { TutorProfileManagement } from './pages/TutorProfileManagement';
import { TutorScheduleListManagement } from './pages/TutorScheduleListManagement';

export function TutorRoutes() {
  return (
    <Routes>
      <Route path="profile" element={<TutorProfileManagement />} />
      <Route path="courses" element={<TutorCourseListManagement />} />
      <Route path="schedules" element={<TutorScheduleListManagement />} />
    </Routes>
  );
}
