import { SubjectCreationDto } from '../course';
import { CertificateCreationDto } from './certificateCreationDto';
import { DegreeCreationDto } from './degreeCreationDto';

export interface TutorRegistrationDto {
  description: string;
  userId: string;
  fullName: string;
  degrees: DegreeCreationDto[];
  certificates: CertificateCreationDto[];
  subjects: Omit<SubjectCreationDto, 'tutorId'>[];
  images?: FileList;
}
