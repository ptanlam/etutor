import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';

import { ConstantType } from '../../../constants/features/constants';
import { QueryKey } from '../../../constants/shared';
import { ApplicationContext } from '../../../contexts';
import { ConstantCreationDto } from '../../../dtos/constants';
import { environment } from '../../../environment';
import { useGetAccessToken } from '../../../hooks';

export function useUpdateConstant(queryKey: QueryKey, type?: ConstantType) {
  const { constantsService } = useContext(ApplicationContext);
  const getAccessToken = useGetAccessToken();

  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, dto }: { id: string; dto: ConstantCreationDto }) => {
      if (!type) return;

      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        // TODO: get appropriate scope
      });

      return constantsService.update(dto, id, type, accessToken);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );
}
