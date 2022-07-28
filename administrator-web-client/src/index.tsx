import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import { store } from './app/store';
import { ApplicationContextProvider } from './contexts';
import { environment } from './environment';
import reportWebVitals from './reportWebVitals';
import { BaseHttpClient } from './services/baseHttpClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
const baseHttpClient = BaseHttpClient.createNew();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ApplicationContextProvider httpClient={baseHttpClient}>
            <Auth0Provider
              domain={environment.idpDomain!}
              clientId={environment.idpClientId!}
              redirectUri={`${window.location.origin}/callback`}
              useRefreshTokens={true}
              cacheLocation="localstorage"
              audience={environment.idpAudience}
            >
              <ChakraProvider>
                <App />
              </ChakraProvider>
            </Auth0Provider>
          </ApplicationContextProvider>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
