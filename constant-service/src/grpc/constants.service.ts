import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { GetAcademicRankById } from '../academic-ranks/queries/get-academic-rank-by-id';
import { AcademicRankDocument } from '../academic-ranks/schemas';
import { GetEducationalGradeById } from '../educational-grades/queries/get-educational-grade-by-id';
import { EducationalGradeDocument } from '../educational-grades/schemas';
import { GetEducationalLevelById } from '../educational-levels/queries/get-educational-level-by-id';
import { EducationalLevelDocument } from '../educational-levels/schemas';
import { GetGenderById } from '../genders/queries/get-gender-by-id';
import { GenderDocument } from '../genders/schemas';
import { GetConstantRequest } from './dtos';

@Controller()
export class ConstantsService {
  constructor(private readonly _commandBus: CommandBus) {}

  @GrpcMethod('Constants')
  async getGenderById(request: GetConstantRequest) {
    if (!request.id) return { id: '', name: '' };

    const { id } = request;
    const getGenderById = new GetGenderById(id.value);

    const gender = await this._commandBus.execute<
      GetGenderById,
      GenderDocument | null
    >(getGenderById);

    if (!gender) return { id: '', name: '' };
    return { id: gender.id!, name: gender.name };
  }

  @GrpcMethod('Constants')
  async getAcademicRankById(request: GetConstantRequest) {
    if (!request.id) return { id: '', name: '' };

    const { id } = request;
    const getAcademicRankById = new GetAcademicRankById(id.value);

    const academicRank = await this._commandBus.execute<
      GetAcademicRankById,
      AcademicRankDocument
    >(getAcademicRankById);

    if (!academicRank) return { id: '', name: '' };
    return { id: academicRank.id!, name: academicRank.name };
  }

  @GrpcMethod('Constants')
  async getEducationalLevelById(request: GetConstantRequest) {
    if (!request.id) return { id: '', name: '' };

    const { id } = request;
    const getEducationalLevelById = new GetEducationalLevelById(id.value);

    const educationalLevel = await this._commandBus.execute<
      GetEducationalLevelById,
      EducationalLevelDocument
    >(getEducationalLevelById);

    if (!educationalLevel) return { id: '', name: '' };
    return { id: educationalLevel.id!, name: educationalLevel.name };
  }

  @GrpcMethod('Constants')
  async getEducationalGradeById(request: GetConstantRequest) {
    if (!request.id) return { id: '', name: '' };

    const { id } = request;
    const getEducationalGradeById = new GetEducationalGradeById(id.value);

    const educationalGrade = await this._commandBus.execute<
      GetEducationalGradeById,
      EducationalGradeDocument
    >(getEducationalGradeById);

    if (!educationalGrade) return { id: '', name: '' };
    return { id: educationalGrade.id!, name: educationalGrade.name };
  }
}
