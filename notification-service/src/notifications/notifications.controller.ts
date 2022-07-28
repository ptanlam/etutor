import { Body, Controller, Get, Patch, Post, Query, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Utils } from '../utils';
import { GetNotificationListForUserDto } from './dtos';
import { NotificationsService } from './notifications.service';
import { Response } from 'express';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly _notificationsService: NotificationsService) {}

  @Get()
  async listForUser(
    @Query() { userId, pageNumber, pageSize }: GetNotificationListForUserDto,
    @Res() response: Response,
  ) {
    const [notifications, totalCount] =
      await this._notificationsService.listForUser(
        userId,
        pageNumber,
        pageSize,
      );

    const [data, paginationMeta] = Utils.getPagedList(
      notifications,
      pageNumber,
      pageSize,
      totalCount,
    );

    response.setHeader('X-Pagination', paginationMeta);
    return response.send(data);
  }

  @Post()
  addForUser(@Body() data: Prisma.NotificationCreateInput) {
    return this._notificationsService.addForUser(data);
  }

  @Patch('viewed')
  viewList(@Body('ids') ids: string[]) {
    return this._notificationsService.viewList(ids);
  }
}
