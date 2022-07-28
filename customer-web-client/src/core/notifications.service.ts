import { Notification } from '../models/notification';
import { PagedListRequest } from '../models/shared';
import { BaseHttpClient } from './baseHttpClient';

export class NotificationsService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  listForUser(
    userId: string,
    pagedListRequest: PagedListRequest,
    signal?: AbortSignal,
  ) {
    return this._httpClient.callAPIWithPagination<Notification[]>({
      url: 'notifications',
      method: 'GET',
      params: { userId, ...pagedListRequest },
      signal,
    });
  }

  viewList(ids: string[]) {
    return this._httpClient.callAPI<void>({
      url: 'notifications/viewed',
      method: 'PATCH',
      data: { ids },
    });
  }
}
