import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { SubjectCreationDto } from '../../../shared/dtos/course';

export const useAddSubject = (tutorId: string) => {
  const { coursesService } = useContext(ApplicationContext);
  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();

  return useMutation(
    async (dto: SubjectCreationDto) => {
      const accessToken = await getAccessToken({
        // TODO: get create:subjects scope
        // TODO: implement scope check on backend side
      });

      return coursesService.addSubject(dto, tutorId, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tutors', tutorId, 'subjects']);
      },
    }
  );
};
