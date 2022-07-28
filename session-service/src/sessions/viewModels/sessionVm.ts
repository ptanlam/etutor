import { GetCourseBasicInfoResponse } from '../../courses/responses';

export class SessionVm {
  constructor(
    readonly ownerId: string,
    readonly course: GetCourseBasicInfoResponse,
    readonly enrollmentId: string,
    readonly from: Date,
    readonly to: Date,
    readonly isFinished: boolean,
    readonly studentIsAttended: boolean,
    readonly notes: string,
    readonly delayTo: string,
  ) {}
}
