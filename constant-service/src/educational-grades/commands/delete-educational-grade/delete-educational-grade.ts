import { IsString } from 'class-validator';

export class DeleteEducationalGrade {
  @IsString()
  id!: string;

  @IsString()
  educationalLevelId!: string;
}
