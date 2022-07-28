import { ApplicationFile } from '../storage';

export interface Degree {
  id: number;
  name: string;
  major: string;
  graduatedUniversity: string;
  dateOfIssue: string;
  academicRank: string;
  image?: ApplicationFile;
}
