import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [PrismaService, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
