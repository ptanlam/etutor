import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { NotificationsService } from '../notifications';
import { MessagingWrapper, NotificationAddRequestDto } from './dto';

@Injectable()
export class MessagingService {
  constructor(
    private readonly _notificationService: NotificationsService,
    private readonly _mailerService: MailerService,
  ) {}

  @RabbitSubscribe({
    exchange: 'notification',
    queue: 'notification-add-queue',
    routingKey: 'notification.command.add',
  })
  async addNotificationHandler({
    message,
  }: MessagingWrapper<NotificationAddRequestDto>) {
    const { email, title, content, userId } = message;

    if (!!email) {
      await this._mailerService.sendMail({
        to: email,
        subject: title,
        text: content,
      });
    }

    await this._notificationService.addForUser({ title, content, userId });
  }
}
