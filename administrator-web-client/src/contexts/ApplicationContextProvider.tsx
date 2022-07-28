import { PropsWithChildren } from 'react';
import React from 'react';

import {
  ConstantsService,
  CoursesService,
  IdentityService,
  TutorsService,
} from '../services';
import { BaseHttpClient } from '../services/baseHttpClient';
import {
  ApplicationContext,
  ApplicationContextProps,
} from './ApplicationContext';

type ApplicationContextProviderProps = {
  httpClient: BaseHttpClient;
};

export function ApplicationContextProvider({
  children,
  httpClient,
}: PropsWithChildren<ApplicationContextProviderProps>) {
  const services: ApplicationContextProps = {
    constantsService: new ConstantsService(httpClient),
    identityService: new IdentityService(httpClient),
    tutorsService: new TutorsService(httpClient),
    coursesService: new CoursesService(httpClient),
  };

  return (
    <ApplicationContext.Provider value={services}>
      {children}
    </ApplicationContext.Provider>
  );
}
