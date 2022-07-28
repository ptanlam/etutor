import { Inject, OnModuleInit } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  catchError,
  firstValueFrom,
  from,
  map,
  mergeMap,
  of,
  toArray,
} from 'rxjs';
import { coursesServiceToken, ICoursesService } from '../../../courses';
import { GetCourseBasicInfoResponse } from '../../../courses/responses';
import { Session } from '../../schemas';
import { SessionVm } from '../../viewModels';
import { GetSessionsForTarget } from './get-sessions-for-target';

@CommandHandler(GetSessionsForTarget)
export class GetSessionsForTargetHandler
  implements ICommandHandler<GetSessionsForTarget, SessionVm[]>, OnModuleInit
{
  private _coursesService!: ICoursesService;

  constructor(
    @InjectModel(Session.name) private readonly _sessionModel: Model<Session>,
    @Inject(coursesServiceToken) private readonly _client: ClientGrpc,
  ) {}

  onModuleInit() {
    this._coursesService = this._client.getService<ICoursesService>('Courses');
  }

  async execute(command: GetSessionsForTarget): Promise<SessionVm[]> {
    const { targetType, targetId, from: fromDate, to: toDate } = command;

    let whereClause: { [key: string]: string } = {};
    if (targetType === 'owner') whereClause = { ownerId: targetId };
    if (targetType === 'course') whereClause = { courseId: targetId };
    if (targetType === 'enrollment') whereClause = { enrollmentId: targetId };

    const sessionList = await this._sessionModel
      .where({ ...whereClause, from: { $gte: fromDate }, to: { $lte: toDate } })
      .sort({ from: 'asc' })
      .exec();

    return await firstValueFrom(
      from(sessionList).pipe(
        mergeMap((session) =>
          this._coursesService
            .getCourseBasicInfo({ id: session.courseId })
            .pipe(
              catchError((_) =>
                of<GetCourseBasicInfoResponse>({
                  id: '',
                  name: '',
                  subjectName: '',
                  educationalLevel: '',
                  educationalGrade: '',
                }),
              ),
              map((course) => {
                const sessionJson = session.toJSON();
                const { courseId, ...rest } = sessionJson;
                return { ...rest, course } as SessionVm;
              }),
            ),
        ),
        toArray(),
      ),
    );
  }
}
