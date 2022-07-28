import { ApplicationContextProps } from './contexts';
import {
  BaseHttpClient,
  ConstantsService,
  CoursesService,
  EnrollmentsService,
  FeedbacksService,
  IdentityService,
  NotificationsService,
  PaymentsService,
  SessionsService,
  TutorsService,
} from './core';

const baseHttpClient = BaseHttpClient.createNew();

export const services: ApplicationContextProps = {
  tutorsService: new TutorsService(baseHttpClient),
  constantsService: new ConstantsService(baseHttpClient),
  coursesService: new CoursesService(baseHttpClient),
  feedbacksService: new FeedbacksService(baseHttpClient),
  identityService: new IdentityService(baseHttpClient),
  sessionsService: new SessionsService(baseHttpClient),
  enrollmentsService: new EnrollmentsService(baseHttpClient),
  paymentsService: new PaymentsService(baseHttpClient),
  notificationsService: new NotificationsService(baseHttpClient),
};
