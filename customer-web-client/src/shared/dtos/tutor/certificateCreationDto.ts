import { Certificate } from '../../../models/tutor';

export interface CertificateCreationDto
  extends Pick<Certificate, 'name' | 'placeOfIssue'> {
  dateOfIssue: Date;
  expiresIn: Date;
  images?: FileList;
}
