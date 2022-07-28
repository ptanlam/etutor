import { Provider } from 'react-redux';

import { Auth0Provider } from '@auth0/auth0-react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { AppRoutes } from './AppRoutes';
import { store } from './app/store';
import { environment } from './environment';
import { BaseLayout } from './layouts/BaseLayout';

function App() {
  return (
    <MantineProvider theme={{ fontFamily: 'Walsheim' }}>
      <ModalsProvider modalProps={{ centered: true }}>
        <Auth0Provider
          domain={environment.idpDomain!}
          clientId={environment.idpClientId!}
          redirectUri={window.location.origin}
          useRefreshTokens={true}
          cacheLocation="localstorage"
          audience={environment.idpAudience}
        >
          <PayPalScriptProvider
            options={{
              'client-id': environment.paypalClientId,
            }}
          >
            <Provider store={store}>
              <BaseLayout>
                <AppRoutes />
              </BaseLayout>
            </Provider>
          </PayPalScriptProvider>
        </Auth0Provider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
