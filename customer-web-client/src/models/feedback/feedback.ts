import { ApplicationUser } from '../identity';

export interface Feedback {
  id: string;
  topicId: string;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  owner: Omit<ApplicationUser, 'genders' | 'phoneNumber'>;
}
