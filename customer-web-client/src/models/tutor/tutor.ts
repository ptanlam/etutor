import { ApplicationUser } from '../identity';
import { ApplicationFile } from '../storage';

export interface Tutor
  extends Pick<
    ApplicationUser,
    'firstName' | 'lastName' | 'fullName' | 'dateOfBirth' | 'gender'
  > {
  id: string;
  description: string;

  rentalAmount: number;
  rentalUnit: string;

  images: ApplicationFile[];
}
