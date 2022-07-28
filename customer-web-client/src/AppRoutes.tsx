import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { BarsLoader } from './components/BarsLoader';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ApplicationRole } from './constants/models';
import { CourseListRoutes } from './features/courseList/CourseListRoutes';
import { PaymentRoutes } from './features/payment';
import { TutorListRoutes } from './features/tutorList';
import { UserRoutes } from './features/user';
import { AboutUsPage } from './pages/AboutUsPage/';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage/';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { WhyUsPage } from './pages/WhyUsPage';

const TutorRoutes = React.lazy(() =>
  import('./features/tutor').then(({ TutorRoutes }) => ({
    default: TutorRoutes,
  }))
);

const StudentRoutes = React.lazy(() =>
  import('./features/student').then(({ StudentRoutes }) => ({
    default: StudentRoutes,
  }))
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="careers" element={<CareersPage />} />
      <Route path="about" element={<AboutUsPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="why-us" element={<WhyUsPage />} />

      <Route path="tutors/*" element={<TutorListRoutes />} />
      <Route path="courses/*" element={<CourseListRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />

      <Route
        path="/tutor/*"
        element={
          <ProtectedRoute requiredRole={ApplicationRole.Tutor}>
            <Suspense fallback={<BarsLoader />}>
              <TutorRoutes />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/*"
        element={
          <ProtectedRoute requiredRole={ApplicationRole.Student}>
            <Suspense fallback={<BarsLoader />}>
              <StudentRoutes />
            </Suspense>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/*"
        element={
          <ProtectedRoute>
            <PaymentRoutes />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
