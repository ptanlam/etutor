import { Enrollment } from '../models/enrollment';
import { EnrollmentCreationDto } from '../shared/dtos/enrollment';
import { RequestContentType, RequestHeader } from '../shared/enums';
import { convertToDateTimeOffset, populateFormDataForDto } from '../utils';
import { BaseHttpClient } from './baseHttpClient';

export class EnrollmentsService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  async create(dto: EnrollmentCreationDto, accessToken: string) {
    const { startAt, endAt, ...rest } = dto;

    const formData = populateFormDataForDto<
      Omit<
        EnrollmentCreationDto,
        'startDate' | 'endDate' | 'learningDays' | 'startAt' | 'endAt'
      > & {
        startDate: string;
        endDate: string;
        learningDays: string;
      }
    >({
      ...rest,
      startDate: convertToDateTimeOffset(dto.startDate, startAt),
      endDate: convertToDateTimeOffset(dto.endDate, endAt),
      learningDays: dto.learningDays.join(','),
    });

    return await this._httpClient.callAuthenticatedAPI(
      {
        url: 'enrollments',
        method: 'POST',
        data: formData,
        headers: {
          [RequestHeader.ContentType]: RequestContentType.FormData,
        },
      },
      accessToken,
    );
  }

  getForCourseAndStudent(courseId: string, studentId: string) {
    return this._httpClient.callAPI<Enrollment>({
      url: 'enrollments',
      params: { courseId, studentId },
      method: 'GET',
    });
  }
}
