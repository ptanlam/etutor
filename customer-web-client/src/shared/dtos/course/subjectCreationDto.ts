import { Subject } from '../../../models/course';

export interface SubjectCreationDto extends Pick<Subject, 'name'> {
  tutorId: string;
  educationalLevelId: string;
  educationalGradeId: string;
}
