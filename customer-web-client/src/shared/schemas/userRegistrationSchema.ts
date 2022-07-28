import axios from 'axios';
import * as yup from 'yup';

import { environment } from '../../environment';

export const personalInfoSchema = yup.object({
  firstName: yup.string().min(2).max(50).required(),
  middleName: yup.string().max(50).notRequired(),
  lastName: yup.string().min(2).max(50).required(),
  dateOfBirth: yup.date().max(new Date()).required(),
  genderId: yup.string().required(),
});

export const personalInfoSchemaWithPhoneNumberValidator =
  personalInfoSchema.shape({
    phoneNumber: yup
      .string()
      .max(20)
      .required()
      .test(
        'checkPhoneNumberIsUnique',
        'This phone number is already registered',
        async (phoneNumber) => {
          try {
            const response = await axios.get(
              `${environment.apiBaseUrl}/users/phone-number/${phoneNumber}`,
            );
            return !response.data;
          } catch (error) {
            return false;
          }
        },
      ),
  });

export const accountInfoSchema = yup.object({
  email: yup
    .string()
    .email()
    .required()
    .test(
      'checkEmailIsUnique',
      'This email is already registered',
      async (email) => {
        try {
          const response = await axios.get(
            `${environment.apiBaseUrl}/users/email/${email}`,
          );
          return !response.data;
        } catch (error: any) {
          return false;
        }
      },
    ),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      {
        message:
          'password must have at least one upper case letter, one lower case letter, one digit, one special character and minimum 8 letters.',
      },
    )
    .required(),
  confirmationPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'password must match'),
});
