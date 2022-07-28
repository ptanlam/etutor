import { Degree } from '../../../models/tutor';

export interface DegreeCreationDto
  extends Pick<Degree, 'name' | 'major' | 'graduatedUniversity'> {
  academicRankId: string;
  dateOfIssue: Date;
  images?: FileList;
}
