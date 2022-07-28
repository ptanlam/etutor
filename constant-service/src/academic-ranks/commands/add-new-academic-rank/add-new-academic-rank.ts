import { IsString, MaxLength } from 'class-validator';

export class AddNewAcademicRank {
  @IsString()
  @MaxLength(250)
  name!: string;
}
