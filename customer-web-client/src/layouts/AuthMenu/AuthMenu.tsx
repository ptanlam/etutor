import React, { useContext } from 'react';
import { FiUser } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdPayment } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Box, Divider, Menu, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';

import {
  studentMenuItems,
  tutorMenuItems,
} from '../../constants/layouts/AuthSection';
import { ApplicationRole } from '../../constants/models';
import { ApplicationContext } from '../../contexts';
import { setTutorDetails } from '../../features/tutor/tutorSlice';
import { userDetailsSelector } from '../../features/user/userSlice';
import { checkHavingRole } from '../../utils';
import styles from './AuthMenu.module.css';

export function AuthMenu() {
  const { tutorsService } = useContext(ApplicationContext);
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  const { openConfirmModal } = useModals();

  const { firstName, lastName, email, avatarUrl, roles, id } =
    useSelector(userDetailsSelector);

  const isTutor = checkHavingRole(roles, ApplicationRole.Tutor);
  const isStudent = checkHavingRole(roles, ApplicationRole.Student);

  useQuery(
    ['tutors', id],
    async () => {
      const profile = await tutorsService.getDetailsForUser(id);
      if (!profile) return;

      dispatch(setTutorDetails(JSON.stringify(profile)));

      return profile;
    },
    { enabled: !!id && isTutor, refetchOnWindowFocus: false },
  );

  return (
    <Box>
      <Menu
        control={
          <Box className={styles.menuButtonContainer}>
            <Avatar src={avatarUrl} radius="xl" />
            <Box className={styles.userInfoContainer}>
              <Text size="sm" weight={500}>
                {firstName} {lastName}
              </Text>
              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </Box>
          </Box>
        }
      >
        <Menu.Label>Profile</Menu.Label>
        <Menu.Item icon={<FiUser />}>
          <NavLink to="user/profile">My Information</NavLink>
        </Menu.Item>
        <Menu.Item icon={<MdPayment />}>
          <NavLink to="payment/methods">Credit Cards</NavLink>
        </Menu.Item>
        <Divider />

        {isStudent && <Menu.Label>Study</Menu.Label>}
        {isStudent && React.Children.toArray(studentMenuItems)}
        {isStudent && <Divider />}

        {isTutor && <Menu.Label>Work</Menu.Label>}
        {isTutor && React.Children.toArray(tutorMenuItems)}
        {isTutor && <Divider />}

        <Menu.Item
          color="red"
          icon={<HiOutlineLogout />}
          onClick={() =>
            openConfirmModal({
              title: 'Logout',
              children: <Text>Do you really want to logout?</Text>,
              labels: { confirm: 'Confirm', cancel: 'Back' },
              onConfirm: () => logout({ returnTo: window.location.origin }),
            })
          }
        >
          Logout
        </Menu.Item>
      </Menu>
    </Box>
  );
}
