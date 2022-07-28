import { CourseRegistrationDto } from './courseRegistrationDto';

export interface OnlineCourseRegistrationDto extends CourseRegistrationDto {
  name: string;
  description: string;
  maxNumberOfStudents: number;
  thumbnail: FileList;
}
