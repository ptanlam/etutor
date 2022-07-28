import { Enrollment } from '../../../models/enrollment';

export interface EnrollmentCreationDto
  extends Pick<
    Enrollment,
    'courseId' | 'studentId' | 'tuitionAmount' | 'tuitionUnit'
  > {
  //* only required for one-on-one course
  subjectId?: string;
  tutorId?: string;

  startDate: Date;
  endDate: Date;
  startAt: string;
  endAt: string;
  learningDays: string[];
}
