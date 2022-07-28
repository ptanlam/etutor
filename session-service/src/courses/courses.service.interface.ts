import { Observable } from 'rxjs';
import { GetCourseBasicInfoRequest } from './requests';
import { GetCourseBasicInfoResponse } from './responses';

export interface ICoursesService {
  getCourseBasicInfo(
    request: GetCourseBasicInfoRequest,
  ): Observable<GetCourseBasicInfoResponse>;
}
