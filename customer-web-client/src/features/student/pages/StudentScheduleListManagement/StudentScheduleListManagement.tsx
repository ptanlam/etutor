import React from 'react';
import { useSelector } from 'react-redux';

import { ScheduleListManagement } from '../../../sessionList/pages/ScheduleListManagement';
import { userDetailsSelector } from '../../../user/userSlice';

export function StudentScheduleListManagement() {
  const { id } = useSelector(userDetailsSelector);
  return <ScheduleListManagement resource="students" ownerId={id} />;
}
