import {
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  useAuth0,
} from '@auth0/auth0-react';

import { tryGetAccessToken } from '../utils';

export function useGetAccessToken() {
  const { getAccessTokenWithPopup, getAccessTokenSilently } = useAuth0();

  return (options?: GetTokenSilentlyOptions & GetTokenWithPopupOptions) =>
    tryGetAccessToken(getAccessTokenSilently, getAccessTokenWithPopup, options);
}
