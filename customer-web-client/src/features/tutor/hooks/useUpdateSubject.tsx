import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ApplicationContext } from '../../../contexts';
import { useGetAccessToken } from '../../../hooks';
import { SubjectCreationDto } from '../../../shared/dtos/course';

export const useUpdateSubject = (tutorId: string) => {
  const { coursesService } = useContext(ApplicationContext);
  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ dto, id }: { dto: SubjectCreationDto; id: string }) => {
      const accessToken = await getAccessToken({
        // TODO: get create:subjects scope
        // TODO: implement scope check on backend side
      });

      return coursesService.updateSubject(dto, id, accessToken);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tutors', tutorId, 'subjects']);
      },
    }
  );
};
