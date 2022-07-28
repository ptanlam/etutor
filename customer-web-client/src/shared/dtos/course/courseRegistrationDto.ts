import { CourseType, Syllabus } from '../../../models/course';

export interface CourseRegistrationDto {
  startDate: Date;
  endDate: Date;
  tuitionFeeAmount: number;
  tuitionFeeUnit: string;
  subjectId: string;
  startAt: string;
  endAt: string;
  syllabi: Syllabus[];
  learningDays: string[];
  tutorId: string;
  type: CourseType;
}
