import { Certificate } from './certificate';
import { Degree } from './degree';
import { Tutor } from './tutor';

export interface TutorDetails extends Tutor {
  gender: string;
  description: string;
  phoneNumber: string;
  email: string;
  certificates: Certificate[];
  degrees: Degree[];
}
