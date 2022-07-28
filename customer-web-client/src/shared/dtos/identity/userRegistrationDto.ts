export interface UserRegistrationDto {
  email: string;
  password: string;
  confirmationPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  genderId: string;
  phoneNumber: string;
}
