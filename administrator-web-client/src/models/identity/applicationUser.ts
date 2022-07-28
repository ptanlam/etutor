import { Role } from './role';

export interface ApplicationUser {
  id: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl: string;
  roles: Role[];
}
