import { PartialType } from '@nestjs/mapped-types';
import { AddNewAcademicRank } from '../add-new-academic-rank';

export class UpdateAcademicRank extends PartialType(AddNewAcademicRank) {
  id!: string;
}
