import { Certificate, Degree, Tutor, TutorDetails } from '../models/tutor';
import {
  DegreeCreationDto,
  TutorListSearchingDto,
  TutorRegistrationDto,
} from '../shared/dtos/tutor';
import { CertificateCreationDto } from '../shared/dtos/tutor/certificateCreationDto';
import { RequestContentType, RequestHeader } from '../shared/enums';
import { populateFormDataForDto } from '../utils';
import { BaseHttpClient } from './baseHttpClient';

export class TutorsService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getListByConditions(dto: TutorListSearchingDto, signal?: AbortSignal) {
    return this._httpClient.callAPIWithPagination<Tutor[]>({
      url: 'tutors',
      method: 'GET',
      params: dto,
      signal,
    });
  }

  getDetails(id: string) {
    return this._httpClient.callAPI<TutorDetails>({
      url: `tutors/${id}`,
      method: 'GET',
    });
  }

  getDetailsForUser(userId: string) {
    return this._httpClient.callAPI<TutorDetails>({
      url: 'tutors/details',
      method: 'GET',
      params: { userId },
    });
  }

  getNameList(query: string, signal?: AbortSignal) {
    return this._httpClient.callAPI<string[]>({
      url: `tutors/name`,
      method: 'GET',
      params: { query },
      signal,
    });
  }

  checkUserExisting(userId: string) {
    return this._httpClient.callAPI<boolean>({
      url: `tutors/users/${userId}`,
      method: 'GET',
    });
  }

  register(dto: TutorRegistrationDto, accessToken: string) {
    const formData = this.populateTutorRegistrationFormData(dto);

    return this._httpClient.callAuthenticatedAPI<Tutor>(
      {
        url: 'tutors',
        method: 'POST',
        headers: {
          [RequestHeader.ContentType]: RequestContentType.FormData,
        },
        data: formData,
        timeout: 300000,
      },
      accessToken,
    );
  }

  addDegree(tutorId: string, dto: DegreeCreationDto, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI<Degree>(
      {
        url: `tutors/${tutorId}/degrees`,
        method: 'POST',
        data: populateFormDataForDto(dto),
      },
      accessToken,
    );
  }

  updateDegree(
    id: number,
    tutorId: string,
    dto: Partial<DegreeCreationDto>,
    accessToken: string,
  ) {
    // TODO: implement checking access token from backend side
    return this._httpClient.callAuthenticatedAPI<Degree>(
      {
        url: `tutors/${tutorId}/degrees/${id}`,
        method: 'PATCH',
        data: dto,
      },
      accessToken,
    );
  }

  addCertificate(
    tutorId: string,
    dto: CertificateCreationDto,
    accessToken: string,
  ) {
    return this._httpClient.callAuthenticatedAPI<Certificate>(
      {
        url: `tutors/${tutorId}/certificates`,
        method: 'POST',
        data: populateFormDataForDto(dto),
      },
      accessToken,
    );
  }

  updateCertificate(
    id: number,
    tutorId: string,
    dto: Partial<DegreeCreationDto>,
    accessToken: string,
  ) {
    return this._httpClient.callAuthenticatedAPI<Certificate>(
      {
        url: `tutors/${tutorId}/certificates/${id}`,
        method: 'PATCH',
        data: dto,
      },
      accessToken,
    );
  }

  private populateTutorRegistrationFormData(dto: TutorRegistrationDto) {
    const formData = populateFormDataForDto(dto);

    dto.degrees.forEach(
      (
        {
          name,
          major,
          graduatedUniversity,
          academicRankId,
          dateOfIssue,
          images,
        },
        index,
      ) => {
        formData.append(`degrees[${index}].name`, name);
        formData.append(`degrees[${index}].major`, major);
        formData.append(
          `degrees[${index}].graduatedUniversity`,
          graduatedUniversity,
        );
        formData.append(`degrees[${index}].academicRankId`, academicRankId);
        formData.append(
          `degrees[${index}].dateOfIssue`,
          dateOfIssue.toLocaleString(),
        );
        Array.from(images || []).forEach((image) =>
          formData.append(`degrees[${index}].images`, image),
        );
      },
    );

    dto.certificates.forEach(
      ({ name, placeOfIssue, dateOfIssue, expiresIn, images }, index) => {
        formData.append(`certificates[${index}].name`, name);
        formData.append(`certificates[${index}].placeOfIssue`, placeOfIssue);
        formData.append(
          `certificates[${index}].dateOfIssue`,
          dateOfIssue.toLocaleString(),
        );
        formData.append(
          `certificates[${index}].expiresIn`,
          expiresIn.toLocaleString(),
        );
        Array.from(images || []).forEach((image) =>
          formData.append(`certificates[${index}].images`, image),
        );
      },
    );

    dto.subjects.forEach(
      ({ name, educationalLevelId, educationalGradeId }, index) => {
        formData.append(`subjects[${index}].name`, name);
        formData.append(
          `subjects[${index}].educationalLevelId`,
          educationalLevelId,
        );
        formData.append(
          `subjects[${index}].educationalGradeId`,
          educationalGradeId || '',
        );
      },
    );

    return formData;
  }
}
