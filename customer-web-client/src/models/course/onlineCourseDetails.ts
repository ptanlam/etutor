import { OnlineCourse } from './onlineCourse';
import { Syllabus } from './syllabus';

export interface CourseDetails extends OnlineCourse {
  syllabi: Syllabus[];
}
