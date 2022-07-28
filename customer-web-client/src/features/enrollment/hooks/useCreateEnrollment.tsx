import { useContext } from 'react';
import { useMutation } from 'react-query';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { EnrollmentCreationDto } from '../../../shared/dtos/enrollment';
import { ApplicationScope } from '../../../shared/enums';

export const useCreateEnrollment = () => {
  const { enrollmentsService } = useContext(ApplicationContext);
  const getAccessToken = useGetAccessToken();

  return useMutation(async (dto: EnrollmentCreationDto) => {
    const accessToken = await getAccessToken({
      scope: ApplicationScope.CREATE_ENROLLMENTS,
    });

    return enrollmentsService.create(dto, accessToken);
  });
};
