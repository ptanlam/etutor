import React from 'react';
import { useSelector } from 'react-redux';

import { ScheduleListManagement } from '../../../sessionList/pages/ScheduleListManagement';
import { tutorDetailsSelector } from '../../tutorSlice';

export function TutorScheduleListManagement() {
  const { id } = useSelector(tutorDetailsSelector);
  return <ScheduleListManagement resource="tutors" ownerId={id} />;
}
