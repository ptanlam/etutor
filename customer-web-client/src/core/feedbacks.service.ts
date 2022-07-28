import { Feedback } from '../models/feedback';
import { PagedListRequest } from '../models/shared';
import { FeedbackCreationDto } from '../shared/dtos/feedback';
import { BaseHttpClient } from './baseHttpClient';

export class FeedbacksService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getListForTopic(topicId: string, pagedListRequest: PagedListRequest) {
    return this._httpClient.callAPIWithPagination<Feedback[]>({
      url: 'feedbacks',
      params: { topicId, ...pagedListRequest },
      method: 'GET',
    });
  }

  postNew(dto: FeedbackCreationDto, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI<Feedback>(
      {
        url: 'feedbacks',
        data: dto,
        method: 'POST',
      },
      accessToken
    );
  }
}
