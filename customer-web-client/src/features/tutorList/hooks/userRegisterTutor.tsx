import { useContext } from 'react';
import { useMutation } from 'react-query';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { TutorRegistrationDto } from '../../../shared/dtos/tutor';
import { ApplicationScope } from '../../../shared/enums';

export function useRegisterTutor() {
  const { tutorsService } = useContext(ApplicationContext);
  const getAccessToken = useGetAccessToken();

  return useMutation(async (dto: TutorRegistrationDto) => {
    const accessToken = await getAccessToken({
      scope: ApplicationScope.CREATE_TUTORS,
    });

    return tutorsService.register(dto, accessToken);
  });
}
