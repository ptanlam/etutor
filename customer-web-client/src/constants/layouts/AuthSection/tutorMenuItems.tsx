import { AiOutlineOrderedList } from 'react-icons/ai';
import { GrSchedules } from 'react-icons/gr';
import { ImProfile } from 'react-icons/im';
import { NavLink } from 'react-router-dom';

import { Menu } from '@mantine/core';

export const tutorMenuItems = [
  <Menu.Item icon={<ImProfile />}>
    <NavLink to="tutor/profile">Profile</NavLink>
  </Menu.Item>,
  <Menu.Item icon={<AiOutlineOrderedList />}>
    <NavLink to="tutor/courses">Courses</NavLink>
  </Menu.Item>,
  <Menu.Item icon={<GrSchedules />}>
    <NavLink to="tutor/schedules">Schedules</NavLink>
  </Menu.Item>,
];
