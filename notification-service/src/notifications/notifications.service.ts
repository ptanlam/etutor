import { Injectable } from '@nestjs/common';
import { Notification, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly _prisma: PrismaService) {}

  async listForUser(
    userId: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<[Notification[], number]> {
    const notifications = await this._prisma.notification.findMany({
      where: { userId },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    });

    const totalCount = await this._prisma.notification.count({
      where: { userId },
    });

    return [notifications, totalCount];
  }

  addForUser(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return this._prisma.notification.create({ data });
  }

  viewList(ids: string[]) {
    return this._prisma.notification.updateMany({
      where: { id: { in: ids } },
      data: { viewed: true },
    });
  }
}
