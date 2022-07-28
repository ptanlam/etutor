export const environment = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,

  idpDomain: process.env.REACT_APP_IDP_DOMAIN,
  idpClientId: process.env.REACT_APP_IDP_CLIENT_ID,
  idpAudience: process.env.REACT_APP_IDP_AUDIENCE,

  paypalClientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || '',
  paypalClientSecret: process.env.REACT_APP_PAYPAL_CLIENT_SECRET || '',
};
