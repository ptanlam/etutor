import {
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  PopupConfigOptions,
} from '@auth0/auth0-react';

export async function tryGetAccessToken(
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string>,
  getAccessTokenWithPopup: (
    options?: GetTokenWithPopupOptions,
    config?: PopupConfigOptions
  ) => Promise<string>,
  options?: GetTokenSilentlyOptions & GetTokenWithPopupOptions
) {
  try {
    const token = await getAccessTokenSilently(options);
    return token;
  } catch (error: any) {
    const requiredConsent =
      error?.error === 'login_required' || error?.error === 'consent_required';
    if (!requiredConsent) return '';

    const token = await getAccessTokenWithPopup(options);
    return token;
  }
}
