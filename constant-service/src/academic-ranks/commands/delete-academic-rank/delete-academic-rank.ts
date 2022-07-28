import { IsString } from 'class-validator';

export class DeleteAcademicRank {
  @IsString()
  id!: string;
}
