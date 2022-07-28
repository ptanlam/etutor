import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { useAppSelector } from '../../app/hooks';
import { ConfirmModal } from '../../components/ConfirmModal';
import { userDetailsSelector } from '../../features/user/userSlice';
import { convertToTitleCase } from '../../utils';

export function Header() {
  const { pathname } = useLocation();
  const { logout } = useAuth0();

  const { firstName } = useAppSelector(userDetailsSelector);

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const toggleConfirmModal = () => {
    setConfirmModalOpened(!confirmModalOpened);
  };

  const onLogoutClick = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor="gray.50"
        boxShadow="0 0 12px rgba(0, 0, 0, 0.15)"
        flex={1}
        borderRadius={12}
        p={6}
      >
        <Breadcrumb separator="-">
          {React.Children.toArray(
            pathname
              .split('/')
              .filter((section) => !!section)
              .map((section) => (
                <BreadcrumbItem>
                  <Text fontWeight={700} color="gray.500">
                    {convertToTitleCase(section.replace('-', ' '))}
                  </Text>
                </BreadcrumbItem>
              ))
          )}
        </Breadcrumb>

        <Menu>
          <MenuButton>
            <Box display="flex" alignItems="center" gap={4}>
              <Text>Hi, {firstName}</Text>
              <Avatar size="sm" />
            </Box>
          </MenuButton>

          <MenuList>
            <MenuItem onClick={toggleConfirmModal}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <ConfirmModal
        warningText="Do you really want to logout?"
        opened={confirmModalOpened}
        onClose={toggleConfirmModal}
        onYes={onLogoutClick}
      />
    </>
  );
}
