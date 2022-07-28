import { UserRegistrationDto } from './userRegistrationDto';

export interface UserProfileUpdateDto
  extends Omit<
    UserRegistrationDto,
    'confirmationPassword' | 'password' | 'email' | 'phoneNumber'
  > {}
