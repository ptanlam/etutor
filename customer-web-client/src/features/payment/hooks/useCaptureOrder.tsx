import { useContext } from 'react';
import { useMutation } from 'react-query';

import { ApplicationContext } from '../../../contexts';

export function useCaptureOrder() {
  const { paymentsService } = useContext(ApplicationContext);

  return useMutation(async (id: string) => {
    // TODO: get access token
    const accessToken = '';
    await paymentsService.captureOrder(id, accessToken);
  });
}
