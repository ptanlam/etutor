import { createContext } from 'react';

import {
  ConstantsService,
  CoursesService,
  EnrollmentsService,
  FeedbacksService,
  IdentityService,
  NotificationsService,
  PaymentsService,
  SessionsService,
  TutorsService,
} from '../core';

export type ApplicationContextProps = {
  tutorsService: TutorsService;
  constantsService: ConstantsService;
  coursesService: CoursesService;
  feedbacksService: FeedbacksService;
  identityService: IdentityService;
  sessionsService: SessionsService;
  enrollmentsService: EnrollmentsService;
  paymentsService: PaymentsService;
  notificationsService: NotificationsService;
};

export const ApplicationContext = createContext<ApplicationContextProps>(
  {} as ApplicationContextProps,
);
