import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ConstantType } from '../../../constants/features/constants';
import { QueryKey } from '../../../constants/shared';
import { ApplicationContext } from '../../../contexts';
import { environment } from '../../../environment';
import { useGetAccessToken } from '../../../hooks';

type Props = { queryKey?: QueryKey; type?: ConstantType };

export function useRemoveConstant({ queryKey, type }: Props) {
  const { constantsService } = useContext(ApplicationContext);

  const getAccessToken = useGetAccessToken();
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      if (!type) return;

      const accessToken = await getAccessToken({
        audience: environment.idpAudience,
        // TODO: get appropriate scope
      });

      return constantsService.delete(id, type, accessToken);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
    }
  );
}
