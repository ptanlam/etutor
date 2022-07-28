import { ApplicationFile } from '../storage';
import { Course } from './course';

export interface OnlineCourse extends Course {
  name: string;
  description: string;
  maxNumberOfStudents: number;
  thumbnail?: ApplicationFile;
}
