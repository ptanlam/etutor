import { createContext } from 'react';

import {
  ConstantsService,
  CoursesService,
  IdentityService,
  TutorsService,
} from '../services';

export type ApplicationContextProps = {
  constantsService: ConstantsService;
  identityService: IdentityService;
  tutorsService: TutorsService;
  coursesService: CoursesService;
};

export const ApplicationContext = createContext<ApplicationContextProps>(
  {} as ApplicationContextProps
);
