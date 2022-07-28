import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { QueryKey } from '../../../constants/shared';
import { ApplicationContext } from '../../../contexts';
import { EducationalGradeCreationDto } from '../../../dtos/constants';
import { environment } from '../../../environment';
import { useGetAccessToken } from '../../../hooks';

export function useUpdateEducationalGrade() {
  const { constantsService } = useContext(ApplicationContext);

  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, dto }: { id: string; dto: EducationalGradeCreationDto }) => {
      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        // TODO: get appropriate scope
      });

      return constantsService.updateEducationalGrade(
        id,
        dto.name,
        dto.educationalLevelId,
        accessToken
      );
    },
    {
      onSuccess: (_, { dto }) =>
        queryClient.invalidateQueries([
          QueryKey.EducationalLevels,
          dto.educationalLevelId,
          QueryKey.EducationalGrades,
        ]),
    }
  );
}
