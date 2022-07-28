import { Observable } from 'rxjs';

import { GetUserDetailsRequest } from './requests';
import { GetUserDetailsResponse } from './response';

export interface IIdentitiesService {
  getUserDetails(
    request: GetUserDetailsRequest,
  ): Observable<GetUserDetailsResponse>;
}
