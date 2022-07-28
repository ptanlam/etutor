import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { QueryKey } from '../../../constants/shared';
import { ApplicationContext } from '../../../contexts';
import { environment } from '../../../environment';
import { useGetAccessToken } from '../../../hooks';

export function useRemoveEducationalGrade() {
  const { constantsService } = useContext(ApplicationContext);

  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      id,
      educationalLevelId,
    }: {
      id: string;
      educationalLevelId: string;
    }) => {
      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        // TODO: get appropriate scope
      });

      return constantsService.deleteEducationalGrade(
        id,
        educationalLevelId,
        accessToken
      );
    },
    {
      onSuccess: (_, { educationalLevelId }) =>
        queryClient.invalidateQueries([
          QueryKey.EducationalLevels,
          educationalLevelId,
          QueryKey.EducationalGrades,
        ]),
    }
  );
}
