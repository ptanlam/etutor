import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { useAppSelector } from '../../../app/hooks';
import { ApplicationContext } from '../../../contexts';
import { userDetailsSelector } from '../../user/userSlice';

export function useViewNotificationList() {
  const { notificationsService } = useContext(ApplicationContext);

  const { id: userId } = useAppSelector(userDetailsSelector);

  const queryClient = useQueryClient();

  return useMutation((ids: string[]) => notificationsService.viewList(ids), {
    onSuccess: () =>
      queryClient.invalidateQueries(['users', userId, 'notifications']),
  });
}
