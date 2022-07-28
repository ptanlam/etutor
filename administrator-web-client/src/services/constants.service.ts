import { ConstantType } from '../constants/features/constants';
import { ConstantCreationDto } from '../dtos/constants';
import { Constant } from '../models/constant';
import { BaseHttpClient } from './baseHttpClient';

export class ConstantsService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getConstantList<T extends Constant>(type: ConstantType) {
    return this._httpClient.callAPI<T[]>({
      url: `${type}`,
      method: 'GET',
    });
  }

  addNew(dto: ConstantCreationDto, type: ConstantType, accessToken: string) {
    Object.keys(dto).forEach(
      (key) => !(dto as any)[key] && delete (dto as any)[key]
    );

    return this._httpClient.callAuthenticatedAPI<Constant>(
      {
        url: `${type}`,
        method: 'POST',
        data: dto,
      },
      accessToken
    );
  }

  update(
    dto: ConstantCreationDto,
    id: string,
    type: ConstantType,
    accessToken: string
  ) {
    return this._httpClient.callAuthenticatedAPI(
      {
        url: `${type}/${id}`,
        method: 'PATCH',
        data: dto,
      },
      accessToken
    );
  }

  delete(id: string, type: ConstantType, accessToken: string) {
    return this._httpClient.callAuthenticatedAPI(
      {
        url: `${type}/${id}`,
        method: 'DELETE',
      },
      accessToken
    );
  }

  getEducationalGradeList(levelId: string) {
    return this._httpClient.callAPI<Constant[]>({
      url: `educational-levels/${levelId}/educational-grades`,
      method: 'GET',
    });
  }

  addNewEducationalGrade(
    name: string,
    educationalLevelId: string,
    accessToken: string
  ) {
    return this._httpClient.callAuthenticatedAPI<Constant>(
      {
        url: `educational-levels/${educationalLevelId}/educational-grades`,
        method: 'POST',
        data: { name },
      },
      accessToken
    );
  }

  updateEducationalGrade(
    id: string,
    name: string,
    educationalLevelId: string,
    accessToken: string
  ) {
    return this._httpClient.callAuthenticatedAPI<Constant>(
      {
        url: `educational-levels/${educationalLevelId}/educational-grades/${id}`,
        method: 'PATCH',
        data: { name },
      },
      accessToken
    );
  }

  deleteEducationalGrade(
    id: string,
    educationalLevelId: string,
    accessToken: string
  ) {
    return this._httpClient.callAuthenticatedAPI(
      {
        url: `educational-levels/${educationalLevelId}/educational-grades/${id}`,
        method: 'DELETE',
      },
      accessToken
    );
  }
}
