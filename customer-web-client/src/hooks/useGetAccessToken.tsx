import {
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  useAuth0,
} from '@auth0/auth0-react';

export function useGetAccessToken() {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();

  return async (
    options?: GetTokenSilentlyOptions & GetTokenWithPopupOptions,
  ) => {
    try {
      const token = await getAccessTokenSilently(options);
      return token;
    } catch (error: any) {
      const requiredConsent =
        error?.error === 'login_required' ||
        error?.error === 'consent_required';
      if (!requiredConsent) return '';

      const token = await getAccessTokenWithPopup(options);
      return token;
    }
  };
}
