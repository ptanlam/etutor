import { AiOutlineSchedule, AiOutlineTransaction } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import { Menu } from '@mantine/core';

export const studentMenuItems = [
  <Menu.Item icon={<AiOutlineSchedule />}>
    <NavLink to="student/schedules">Schedules</NavLink>
  </Menu.Item>,
  <Menu.Item icon={<AiOutlineTransaction />}>
    <NavLink to="student/transactions">Transactions</NavLink>
  </Menu.Item>,
];
