import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { QueryKey } from '../../constants/shared';
import { ConstantListPage } from './pages/ConstantListPage';
import { EducationalGradeListPage } from './pages/EducationalGradeListPage';

export function ConstantsRoutes() {
  return (
    <Routes>
      <Route
        path="genders"
        element={
          <ConstantListPage type="genders" queryKey={QueryKey.Genders} />
        }
      />

      <Route
        path="academic-ranks"
        element={
          <ConstantListPage
            type="academic-ranks"
            queryKey={QueryKey.AcademicRanks}
          />
        }
      />

      <Route
        path="educational-levels"
        element={
          <ConstantListPage
            type="educational-levels"
            queryKey={QueryKey.EducationalLevels}
          />
        }
      />

      <Route path="educational-grades" element={<EducationalGradeListPage />} />

      <Route
        path="currencies"
        element={
          <ConstantListPage type="currencies" queryKey={QueryKey.Currencies} />
        }
      />
    </Routes>
  );
}
