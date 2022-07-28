import { Tutor, TutorDetails } from '../models/tutor';
import { PagedListRequest, ResponseWithPagination } from '../shared/models';
import { BaseHttpClient } from './baseHttpClient';

export class TutorsService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getTutorPagedList(
    request: PagedListRequest & { isActive: boolean },
    accessToken: string,
    signal?: AbortSignal
  ): Promise<ResponseWithPagination<Tutor>> {
    return this._httpClient.callAuthenticatedAPIWithPagination<Tutor>(
      {
        url: 'tutors/admin',
        method: 'GET',
        params: request,
        signal,
      },
      accessToken
    );
  }

  getTutorDetails(id: string, signal?: AbortSignal) {
    return this._httpClient.callAPI<TutorDetails>({
      url: `tutors/${id}`,
      method: 'GET',
      signal,
    });
  }

  setTutorActiveState(id: string, isActive: boolean, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI(
      {
        url: `tutors/${id}/is-active`,
        method: 'PATCH',
        data: { isActive },
      },
      accessToken
    );
  }

  updateRental(id: string, amount: number, unit: string, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI(
      {
        url: `tutors/${id}/rentals`,
        method: 'POST',
        data: { amount, unit },
      },
      accessToken
    );
  }
}
