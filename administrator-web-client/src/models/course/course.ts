import { Tutor } from '../tutor';

export interface Course {
  id: string;
  startDate: string;
  endDate: string;
  tuitionFeeAmount: number;
  tuitionFeeUnit: string;
  learningDays: string;
  startAt: string;
  endAt: string;
  subjectName: string;

  educationalLevel: string;
  educationalGrade?: string;

  tutor: Tutor;
}
