import {
  CourseCardView,
  CourseDetails,
  CourseType,
  OneOnOneCourse,
  OnlineCourse,
  Subject,
} from '../models/course';
import { PagedListRequest } from '../models/shared';
import {
  CourseListSearchingDto,
  OnlineCourseRegistrationDto,
  SubjectCreationDto,
} from '../shared/dtos/course';
import { RequestContentType, RequestHeader } from '../shared/enums';
import { convertToDateTimeOffset, populateFormDataForDto } from '../utils';
import { BaseHttpClient } from './baseHttpClient';

export class CoursesService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getOnlineCourseListByConditions(
    dto: CourseListSearchingDto,
    type: CourseType,
    pagedListRequest: PagedListRequest,
  ) {
    return this._httpClient.callAPIWithPagination<OnlineCourse[]>({
      url: 'courses',
      method: 'GET',
      params: { type, ...dto, ...pagedListRequest },
    });
  }

  getCourseListForSubject(
    subjectId: string,
    conditions: Omit<CourseListSearchingDto, 'subjectName'>,
    type: CourseType,
    pagedListRequest: PagedListRequest,
  ) {
    return this._httpClient.callAPIWithPagination<OnlineCourse[]>({
      url: `subjects/${subjectId}/courses`,
      method: 'GET',
      params: { type, ...conditions, ...pagedListRequest },
    });
  }

  getCourseListForTutor(
    type: CourseType,
    tutorId: string,
    subjectId: string,
    pagedListRequest: PagedListRequest,
  ) {
    return this._httpClient.callAPIWithPagination<CourseCardView[]>({
      url: `courses/tutors/${tutorId}`,
      method: 'GET',
      params: { type, subjectId, ...pagedListRequest },
    });
  }

  getCourseDetails(id: string) {
    return this._httpClient.callAPI<CourseDetails>({
      url: `courses/${id}`,
      method: 'GET',
    });
  }

  registerNewOnlineCourse(
    {
      startDate,
      endDate,
      startAt,
      endAt,
      ...rest
    }: Omit<OnlineCourseRegistrationDto, 'type'>,
    accessToken: string,
  ) {
    const data = {
      ...rest,
      startDate: convertToDateTimeOffset(startDate, startAt),
      endDate: convertToDateTimeOffset(endDate, endAt),
    };

    return this._httpClient.callAuthenticatedAPI<OnlineCourse>(
      {
        url: 'courses',
        method: 'POST',
        data: this.createFormDataForOnlineCourseRegistrationDto({
          ...data,
          type: 'online',
        }),
        headers: {
          [RequestHeader.ContentType]: RequestContentType.FormData,
        },
      },
      accessToken,
    );
  }

  approveOneOnOneCourse(id: string) {
    return this._httpClient.callAPI<OneOnOneCourse>({
      url: `courses/${id}/tutor-approved`,
      method: 'PATCH',
    });
  }

  getSubjectListForTutor(tutorId: string, signal?: AbortSignal) {
    return this._httpClient.callAPI<Subject[]>({
      url: 'subjects',
      method: 'GET',
      params: { tutorId },
      signal,
    });
  }

  getSubjectNameList(query: string, signal?: AbortSignal) {
    return this._httpClient.callAPI<string[]>({
      url: 'subjects/name',
      method: 'GET',
      params: { query },
      signal,
    });
  }

  addSubject(dto: SubjectCreationDto, tutorId: string, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI<Subject>(
      {
        url: 'subjects',
        method: 'POST',
        data: { ...dto, tutorId },
      },
      accessToken,
    );
  }

  updateSubject(
    dto: Partial<SubjectCreationDto>,
    id: string,
    accessToken: string,
  ) {
    return this._httpClient.callAuthenticatedAPI<Subject>(
      {
        url: `subjects/${id}`,
        method: 'PATCH',
        data: { ...dto },
      },
      accessToken,
    );
  }

  private createFormDataForOnlineCourseRegistrationDto(
    dto: Omit<
      OnlineCourseRegistrationDto,
      'startAt' | 'endAt' | 'startDate' | 'endDate'
    > & {
      startDate: string;
      endDate: string;
    },
  ): FormData {
    const formData = populateFormDataForDto<
      Omit<
        OnlineCourseRegistrationDto,
        'startAt' | 'endAt' | 'startDate' | 'endDate'
      > & {
        startDate: string;
        endDate: string;
      }
    >(dto);

    dto.syllabi.forEach((syllabus, index) => {
      // TODO: create dto for syllabus creation
      formData.append(`syllabi[${index}].title`, syllabus.title);
      formData.append(`syllabi[${index}].description`, syllabus.description);
      formData.append(`syllabi[${index}].achievements`, syllabus.achievements);
      formData.append(`syllabi[${index}].fromDate`, syllabus.fromDate);
      formData.append(`syllabi[${index}].toDate`, syllabus.toDate);
    });

    dto.learningDays.forEach((day, index) =>
      formData.append(`learningDays[${index}]`, day),
    );

    return formData;
  }
}
