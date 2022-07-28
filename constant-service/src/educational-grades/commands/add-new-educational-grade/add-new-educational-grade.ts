import { IsString, MaxLength } from 'class-validator';

export class AddNewEducationalGrade {
  educationalLevelId!: string;

  @IsString()
  @MaxLength(250)
  name!: string;
}
