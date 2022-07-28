import { CourseType } from '../enums/course';
import { Course } from '../models/course';
import { BaseHttpClient } from './baseHttpClient';

export class CoursesService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getPagedList<TCourse extends Course>(
    type: CourseType,
    isActive: boolean,
    accessToken: string,
    signal?: AbortSignal
  ) {
    return this._httpClient.callAuthenticatedAPIWithPagination<TCourse>(
      {
        url: 'courses/admin',
        method: 'GET',
        params: { type, isActive },
        signal,
      },
      accessToken
    );
  }

  setCourseActiveStatus(id: string, isActive: boolean, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI(
      {
        url: `courses/${id}/is-active`,
        method: 'PATCH',
        data: { isActive },
      },
      accessToken
    );
  }
}
