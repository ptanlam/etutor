import { OnlineCourse } from '../course';

export interface Session {
  studentIsAttended: boolean;
  isFinished: boolean;
  to: string;
  from: string;
  enrollmentId: string;
  studentId: string;
  tutorId: string;
  id: string;

  course: Pick<
    OnlineCourse,
    'id' | 'name' | 'subjectName' | 'educationalLevel' | 'educationalGrade'
  >;
}
