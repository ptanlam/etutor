import { IsString } from 'class-validator';

export class GetEducationalGradeListForLevel {
  @IsString()
  educationalLevelId!: string;
}
