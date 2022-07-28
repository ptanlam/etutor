import { ApplicationFile } from '../storage';

export interface Syllabus {
  id: string;
  title: string;
  description: string;
  achievements: string;
  fromDate: string;
  toDate: string;
  files: ApplicationFile[];
}
