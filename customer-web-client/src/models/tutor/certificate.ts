import { ApplicationFile } from '../storage';

export interface Certificate {
  id: number;
  name: string;
  placeOfIssue: string;
  dateOfIssue: string;
  expiresIn: string;
  image?: ApplicationFile;
}
