import { IsString, MaxLength } from 'class-validator';

export class UpdateEducationalGrade {
  id!: string;

  @IsString()
  @MaxLength(250)
  name!: string;
}
