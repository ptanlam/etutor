import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { QueryKey } from '../../../constants/shared';
import { ApplicationContext } from '../../../contexts';
import { environment } from '../../../environment';
import { useGetAccessToken } from '../../../hooks';
import { ApplicationScope } from '../../../shared/enums';

export function useSetTutorActiveStatus(pageNumber: number, pagesize: number) {
  const { tutorsService } = useContext(ApplicationContext);

  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ tutorId, isActive }: { tutorId: string; isActive: boolean }) => {
      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        scope: ApplicationScope.ACTIVE_TUTORS,
      });

      return tutorsService.setTutorActiveState(tutorId, isActive, accessToken);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          QueryKey.InactiveTutors,
          pageNumber,
          pagesize,
        ]),
    }
  );
}
