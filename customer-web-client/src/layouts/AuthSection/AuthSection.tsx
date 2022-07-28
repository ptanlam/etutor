import { useContext } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Container } from '@mantine/core';

import { Wrapper } from '../../components/Wrapper';
import { ApplicationContext } from '../../contexts';
import { NotificationListManagement } from '../../features/notificationList/pages/NotificationListManagement';
import { setUserDetails } from '../../features/user/userSlice';
import { useGetAccessToken } from '../../hooks';
import { ApplicationScope } from '../../shared/enums';
import { AuthMenu } from '../AuthMenu';
import styles from './AuthSection.module.css';

export function AuthSection() {
  const navigate = useNavigate();
  const { identityService } = useContext(ApplicationContext);
  const dispatch = useDispatch();
  const getAccessToken = useGetAccessToken();

  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuthenticating,
    user,
  } = useAuth0();

  const {
    data: userDetails,
    isLoading: fetchingUser,
    isError,
  } = useQuery(
    ['users', user?.sub],
    async () => {
      const accessToken = await getAccessToken({
        scope: ApplicationScope.READ_USER_DETAILS,
      });

      if (!accessToken) return;

      const userDetails = await identityService.getUserDetails(
        user!.sub!,
        accessToken!,
      );

      if (!userDetails) return;
      dispatch(setUserDetails(JSON.stringify(userDetails)));

      return userDetails;
    },
    { enabled: isAuthenticated && !!user?.sub, refetchOnWindowFocus: false },
  );

  const loggedIn = isAuthenticated && !isAuthenticating;
  const loading = fetchingUser || isAuthenticating;

  return (
    <Container size="xl" className={styles.container}>
      {loggedIn ? (
        <Wrapper
          type="component"
          loading={loading}
          hasError={isError}
          data={userDetails}
        >
          <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <NotificationListManagement />
            <AuthMenu />
          </Box>
        </Wrapper>
      ) : (
        <>
          <Button
            size="xs"
            variant="gradient"
            gradient={{ from: 'orange', to: 'yellow' }}
            radius="md"
            onClick={loginWithRedirect}
          >
            Login
          </Button>

          <Button
            size="xs"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            radius="md"
            onClick={() => navigate('/user/registration-form')}
          >
            Register
          </Button>
        </>
      )}
    </Container>
  );
}
