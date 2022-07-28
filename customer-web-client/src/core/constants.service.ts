import {
  AcademicRank,
  Currency,
  EducationalGrade,
  EducationalLevel,
  Gender,
} from '../models/constant';
import { BaseHttpClient } from './baseHttpClient';

export class ConstantsService {
  constructor(private readonly _httpClient: BaseHttpClient) {}

  getGenderList() {
    return this._httpClient.callAPI<Gender[]>({
      url: 'genders',
      method: 'GET',
    });
  }

  getAcademicRankList() {
    return this._httpClient.callAPI<AcademicRank[]>({
      url: 'academic-ranks',
      method: 'GET',
    });
  }

  getEducationalLevelList() {
    return this._httpClient.callAPI<EducationalLevel[]>({
      url: 'educational-levels',
      method: 'GET',
    });
  }

  getEducationalGradeList(levelId: string) {
    return this._httpClient.callAPI<EducationalGrade[]>({
      url: `educational-levels/${levelId}/educational-grades`,
      method: 'GET',
    });
  }

  getCurrencyList() {
    return this._httpClient.callAPI<Currency[]>({
      url: 'currencies',
      method: 'GET',
    });
  }
}
