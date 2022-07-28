import { Prisma } from '@prisma/client';

export interface NotificationAddRequestDto
  extends Prisma.NotificationCreateInput {
  // ! Specify if want to send notification via Email
  email?: string;
}
