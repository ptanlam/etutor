import { useContext } from 'react';
import { useMutation } from 'react-query';

import { useAuth0 } from '@auth0/auth0-react';

import { useAppDispatch } from '../app/hooks';
import { ApplicationContext } from '../contexts';
import { environment } from '../environment';
import { setUserDetails } from '../features/user/userSlice';
import { ApplicationScope } from '../shared/enums';
import { useGetAccessToken } from './useGetAccessToken';

export function useAppLogin() {
  const { identityService } = useContext(ApplicationContext);
  const { user, isAuthenticated } = useAuth0();

  const getAccessToken = useGetAccessToken();
  const dispatch = useAppDispatch();

  return useMutation(async () => {
    if (!isAuthenticated || !user?.sub) return;

    const accessToken = await getAccessToken({
      audience: environment.idpAudience,
      scope: ApplicationScope.READ_USER_DETAILS,
    });

    const userDetails = await identityService.getUserDetails(
      user.sub,
      accessToken
    );

    dispatch(setUserDetails(userDetails));
  });
}
