import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { useAppDispatch } from '../../app/hooks';
import { ApplicationContext } from '../../contexts';
import { environment } from '../../environment';
import { setUserDetails } from '../../features/user/userSlice';
import { useGetAccessToken } from '../../hooks';
import { ApplicationRole, ApplicationScope } from '../../shared/enums';
import { checkHavingRole } from '../../utils';
import { LoadingPage } from '../LoadingPage';

export function AuthorizationCallbackPage() {
  const { identityService } = useContext(ApplicationContext);
  const { isAuthenticated, user, isLoading, logout } = useAuth0();

  const getAccessToken = useGetAccessToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authorizationState] = useState<'accepted' | 'loading' | 'denied'>(
    'loading'
  );

  const [fetchingUserDetails, setFetchingUserDetails] = useState(false);

  useEffect(() => {
    (async function () {
      if (isLoading || fetchingUserDetails) return;
      setFetchingUserDetails(true);

      if (!isAuthenticated || !user?.sub) {
        setFetchingUserDetails(false);
        return;
      }

      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        scope: ApplicationScope.READ_USER_DETAILS,
      });

      const userDetails = await identityService.getUserDetails(
        user.sub,
        accessToken
      );

      const { roles } = userDetails;
      if (!checkHavingRole(roles, ApplicationRole.Admin)) {
        logout({ returnTo: window.location.origin });
        setFetchingUserDetails(false);
        return;
      }

      dispatch(setUserDetails(userDetails));
      setFetchingUserDetails(false);
      navigate('/dashboard');
    })();
  }, [
    fetchingUserDetails,
    isLoading,
    isAuthenticated,
    user?.sub,
    setFetchingUserDetails,
    getAccessToken,
    identityService,
    dispatch,
    logout,
    navigate,
  ]);

  return (
    <>
      {(function () {
        if (authorizationState === 'loading') return <LoadingPage />;
        return <Navigate to="/dashboard" />;
      })()}
    </>
  );
}
